import { ProductRepository } from '@repo/backend-repository';
import { BadRequestError, ConflictError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { Product } from '@repo/database';
import { Product as IProduct } from '@repo/types';
import { toFloat, toInt } from '@repo/utils';

@injectable()
export class ProductService extends BaseService<Product, ProductRepository> {
  constructor(repository: ProductRepository) {
    super(repository);
  }

  async createProduct(data: IProduct) {
    try {
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
        isWholesale: data.isWholesale,
        wholeSalePrice: toFloat(data.wholeSalePrice),
        wholeSaleQty: toInt(data.wholeSaleQty),
        unit: data.unit,
        qty: data.qty,
        productStock: toInt(data.productStock),
        productCode: data.productCode,
        productImages: data.productImages ?? [],

        imageUrl: data.imageUrl ?? '',
        sellPrice: toFloat(
          data.sellPrice,
          parseFloat(data.productPrice.toString())
        ),
      };

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
          isWholesale: newProduct.isWholesale,
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
          productImages: newProduct.productImages,
        },
      });

      return res;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new ConflictError('Record already exists');
      }

      throw new BadRequestError('Failed to create record');
    }
  }

  async updateProduct(productId: string, data: IProduct) {
    try {
      const { categoryId, id, userId, sales, farmerId, ...updateData } = data;

      // Format data before updating
      const formattedData = {
        ...updateData,
        productPrice: parseFloat(data.productPrice.toString()),
        sellPrice: parseFloat(data.sellPrice.toString()),
        wholeSalePrice: parseFloat(data.wholeSalePrice.toString()),
        wholeSaleQty: Number(data.wholeSaleQty),
        productStock: Number(data.productStock),
        qty: Number(data.qty),
        unit: data.unit.toString(),
      };

      // Update the product, excluding the 'sales' relation
      const updatedProduct = await this.repository.update(productId, {
        ...formattedData,
        category: {
          connect: {
            id: data.categoryId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
      });

      return updatedProduct;
    } catch (err) {
      console.log('Error updating product', err.message);
      throw new BadRequestError('Failed to update record');
    }
  }
}
