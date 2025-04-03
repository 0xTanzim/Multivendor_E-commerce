import { PAGE_SIZE } from '@/constants';
import { productService } from '@/lib/di';
import { handleError } from '@/utils';
import { isProduct } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();
    if (!isProduct(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newProduct = await productService.createProduct(data);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categoryId = searchParams.get('catId');
    const sortBy = searchParams.get('sort');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const searchTerm = searchParams.get('search');
    const pageSize = PAGE_SIZE;

    const skip = (page - 1) * pageSize; // Calculate how many items to skip
    const take = pageSize; // Set the number of items to fetch

    let where: any = {};
    let orderBy: any = {};

    // Filter by category ID
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // Filter by price range
    if (minPrice && maxPrice) {
      where.sellPrice = {
        gte: parseFloat(minPrice),
        lte: parseFloat(maxPrice),
      };
    } else {
      if (minPrice) {
        where.sellPrice = {
          gte: parseFloat(minPrice),
        };
      }
      if (maxPrice) {
        where.sellPrice = {
          lte: parseFloat(maxPrice),
        };
      }
    }

    // Sorting
    if (sortBy) {
      orderBy.sellPrice = sortBy === 'asc' ? 'asc' : 'desc';
    }

    // Search by product name
    if (searchTerm) {
      where.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { tags: { has: searchTerm } },
        { sku: { contains: searchTerm, mode: 'insensitive' } },
        { barcode: { contains: searchTerm, mode: 'insensitive' } },
        { productCode: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    // Fetch products based on filters
    const products = await productService.findAll({
      where,
      orderBy,
      skip,
      take,
    });

    // Fetch total count for pagination
    const totalCount = await productService.count({
      where,
    });
    const totalPages = Math.ceil(totalCount / pageSize);

    return NextResponse.json({
      products,
      totalPages,
      totalCount,
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}

