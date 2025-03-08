import { ConflictError } from '@repo/common/error';
import { Product } from '@repo/types';
import { toFloat, toInt } from '@repo/utils';

export class ProductService {
  public static instance: ProductService;
  private constructor() {}
  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  isExistingProduct = async (slug: string) => {
    if (!slug) {
      throw new Error('Invalid slug');
    }

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
      },
    });

    return product ? true : false;
  };

  async createProduct(data: Product) {
    const newProduct = {
      title: data.title,
      slug: data.slug,
      description: data.description ?? '',
      productPrice: parseFloat(data.productPrice.toString()),
      tags: data.tags,
      sku: data.sku,
      barcode: data.barcode,
      categoryId: data.categoryId,
      farmerId: data.farmerId,
      isActive: data.isActive,
      isWholeSale: data.isWholeSale,
      wholeSalePrice: toFloat(data.wholeSalePrice),
      wholeSaleQty: toInt(data.wholeSaleQty),
      unit: data.unit,
      qty: data.qty,
      productStock: toInt(data.productStock),
      productCode: data.productCode,
      images: data.images ?? [],
      imageUrl: data.imageUrl ?? '',
      sellPrice: toFloat(
        data.sellPrice,
        parseFloat(data.productPrice.toString())
      ),
    };

    // check if product exists
    const isExisting = await this.isExistingProduct(newProduct.slug);
    if (isExisting) {
      throw new ConflictError('Product already exists');
    }

    const res = await prisma.product.create({
      data: {
        description: newProduct.description,
        productPrice: newProduct.productPrice,
        tags: newProduct.tags,
        sku: newProduct.sku,
        barcode: newProduct.barcode,
        categoryId: newProduct.categoryId,
        userId: newProduct.farmerId,
        isActive: newProduct.isActive,
        isWholesale: newProduct.isWholeSale,
        wholeSalePrice: newProduct.wholeSalePrice,
        wholeSaleQty: newProduct.wholeSaleQty,
        unit: newProduct.unit,
        qty: newProduct.qty,
        productStock: newProduct.productStock,
        productCode: newProduct.productCode,
        imageUrl: newProduct.imageUrl,
        sellPrice: newProduct.sellPrice,
        slug: newProduct.slug,
        title: newProduct.title,
      },
    });

    return res;
  }

  async fetchAllProducts() {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }
}
