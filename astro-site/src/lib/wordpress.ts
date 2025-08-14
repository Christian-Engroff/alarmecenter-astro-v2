import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.WORDPRESS_API_URL || 'https://alarmecenter.com.br/graphql';
const username = import.meta.env.WORDPRESS_USERNAME;
const password = import.meta.env.WORDPRESS_PASSWORD;

// Create authenticated client
export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    ...(username && password && {
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    })
  },
});

// GraphQL Queries - Updated for WooCommerce with correct fragments
export const GET_PRODUCTS = `
  query GetProducts($first: Int = 50) {
    products(first: $first) {
      nodes {
        ... on SimpleProduct {
          id
          databaseId
          name
          slug
          description
          shortDescription
          price
          regularPrice
          salePrice
          stockStatus
          stockQuantity
          sku
          status
          catalogVisibility
          featured
          onSale
          image {
            sourceUrl
            altText
          }
          galleryImages {
            nodes {
              sourceUrl
              altText
            }
          }
          productCategories {
            nodes {
              id
              name
              slug
              description
            }
          }
          productTags {
            nodes {
              name
              slug
            }
          }
        }
        ... on VariableProduct {
          id
          databaseId
          name
          slug
          description
          shortDescription
          price
          regularPrice
          salePrice
          stockStatus
          sku
          status
          catalogVisibility
          featured
          onSale
          image {
            sourceUrl
            altText
          }
          productCategories {
            nodes {
              id
              name
              slug
              description
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_CATEGORIES = `
  query GetProductCategories($first: Int = 50) {
    productCategories(first: $first, where: {hideEmpty: true}) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
        image {
          sourceUrl
          altText
        }
        parent {
          node {
            name
            slug
          }
        }
        children {
          nodes {
            id
            name
            slug
            count
          }
        }
      }
    }
  }
`;

export const GET_SINGLE_PRODUCT = `
  query GetSingleProduct($slug: String!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
        stockQuantity
      }
      productCategories {
        nodes {
          id
          name
          slug
        }
      }
      sku
      status
      featured
      onSale
      reviews {
        averageRating
        reviewCount
      }
      related {
        nodes {
          id
          name
          slug
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price
          }
        }
      }
    }
  }
`;

export const GET_POSTS = `
  query GetPosts($first: Int = 10) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        excerpt
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
`;

// Fallback data for development
export const mockProducts = [
  {
    id: '1',
    name: 'Bateria de alarme 12v 7Ah Moura Selada AGM',
    slug: 'bateria-12v-7ah-moura',
    description: 'Bateria de alarme 12v 7Ah Moura estacionária Nobreak Tecnologia VRLA AGM',
    price: 'R$ 132,30',
    regularPrice: 'R$ 132,30',
    salePrice: null,
    image: {
      sourceUrl: 'https://alarmecenter.com/wp-content/uploads/2021/05/bateria-moura-12v-7ah-300x300.jpg',
      altText: 'Bateria 12v 7Ah moura selada agm nobreak e alarme'
    },
    productCategories: {
      nodes: [
        { name: 'Bateria de Alarmes e Nobreaks', slug: 'bateria-de-alarmes-e-nobreaks' }
      ]
    }
  },
  {
    id: '2',
    name: 'Sensor De Sobrepor Branco SP-1000 – Giltar',
    slug: 'sensor-sobrepor-sp-1000',
    description: 'Sensor de sobrepor branco SP-1000 da Giltar para sistemas de alarme',
    price: 'R$ 13,35',
    regularPrice: 'R$ 13,35',
    salePrice: null,
    image: {
      sourceUrl: 'https://alarmecenter.com/wp-content/uploads/2021/05/sensor-sp-1000-300x300.jpg',
      altText: 'Sensor De Sobrepor Branco SP-1000 - Giltar'
    },
    productCategories: {
      nodes: [
        { name: 'Sensor de Alarme', slug: 'sensor-de-alarme' }
      ]
    }
  },
  {
    id: '3',
    name: 'Camera Wi-fi Full Color HD IM5+ – Intelbras',
    slug: 'camera-wifi-im5-intelbras',
    description: 'Câmera Wi-Fi Full Color HD IM5+ da Intelbras para monitoramento',
    price: 'R$ 631,34',
    regularPrice: 'R$ 631,34',
    salePrice: null,
    image: {
      sourceUrl: 'https://alarmecenter.com/wp-content/uploads/2021/05/camera-im5-plus-300x300.jpg',
      altText: 'CAMERA WIFI BRANCA INTELBRAS IM5+'
    },
    productCategories: {
      nodes: [
        { name: 'Câmeras de Segurança', slug: 'cameras-de-seguranca' }
      ]
    }
  }
];

export const mockCategories = [
  {
    id: '1',
    name: 'Sistemas de alarme',
    slug: 'alarmes-em-curitiba',
    description: 'Centrais de alarme, sensores e acessórios',
    count: 45,
    image: { sourceUrl: '', altText: '' },
    parent: null
  },
  {
    id: '2',
    name: 'Câmeras e Gravadores',
    slug: 'cameras-de-seguranca',
    description: 'Câmeras IP, analógicas e gravadores DVR/NVR',
    count: 78,
    image: { sourceUrl: '', altText: '' },
    parent: null
  },
  {
    id: '3',
    name: 'Cerca Elétrica',
    slug: 'cerca-eletrica',
    description: 'Centrais de cerca elétrica e acessórios',
    count: 23,
    image: { sourceUrl: '', altText: '' },
    parent: null
  },
  {
    id: '4',
    name: 'Controle de Acesso',
    slug: 'controle-de-acesso',
    description: 'Fechaduras, interfones e controladores',
    count: 34,
    image: { sourceUrl: '', altText: '' },
    parent: null
  },
  {
    id: '5',
    name: 'Bateria Estacionaria',
    slug: 'bateria-estacionaria',
    description: 'Baterias para alarmes e nobreaks',
    count: 15,
    image: { sourceUrl: '', altText: '' },
    parent: null
  },
  {
    id: '6',
    name: 'Energia & Nobreak',
    slug: 'energia-nobreak',
    description: 'Fontes de alimentação e nobreaks',
    count: 28,
    image: { sourceUrl: '', altText: '' },
    parent: null
  }
];

// API Functions with Authentication
export async function fetchProducts() {
  try {
    console.log('Fetching products from WordPress API...');
    const data = await graphqlClient.request(GET_PRODUCTS, { first: 50 });
    console.log('Products fetched successfully:', data.products.nodes.length);
    
    // Transform data to match our interface
    return data.products.nodes.map(product => ({
      id: product.databaseId?.toString() || product.id,
      name: product.name,
      slug: product.slug,
      description: product.shortDescription || product.description,
      price: product.price ? `R$ ${product.price}` : 'Consulte',
      regularPrice: product.regularPrice ? `R$ ${product.regularPrice}` : null,
      salePrice: product.salePrice ? `R$ ${product.salePrice}` : null,
      image: {
        sourceUrl: product.image?.sourceUrl || '/placeholder-product.jpg',
        altText: product.image?.altText || product.name
      },
      productCategories: {
        nodes: product.productCategories?.nodes || []
      },
      sku: product.sku,
      onSale: product.onSale,
      featured: product.featured,
      stockStatus: product.stockStatus
    }));
  } catch (error) {
    console.warn('Failed to fetch products from WordPress API:', error);
    console.log('Using mock data...');
    return mockProducts;
  }
}

export async function fetchProductCategories() {
  try {
    console.log('Fetching categories from WordPress API...');
    const data = await graphqlClient.request(GET_PRODUCT_CATEGORIES, { first: 50 });
    console.log('Categories fetched successfully:', data.productCategories.nodes.length);
    
    // Transform data to match our interface
    return data.productCategories.nodes.map(category => ({
      id: category.databaseId?.toString() || category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      count: category.count,
      image: {
        sourceUrl: category.image?.sourceUrl || '',
        altText: category.image?.altText || category.name
      },
      parent: category.parent?.node || null,
      children: category.children?.nodes || []
    }));
  } catch (error) {
    console.warn('Failed to fetch categories from WordPress API:', error);
    console.log('Using mock data...');
    return mockCategories;
  }
}

export async function fetchSingleProduct(slug: string) {
  try {
    console.log('Fetching single product:', slug);
    const data = await graphqlClient.request(GET_SINGLE_PRODUCT, { slug });
    
    if (!data.product) {
      throw new Error('Product not found');
    }
    
    const product = data.product;
    return {
      id: product.databaseId?.toString() || product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price ? `R$ ${product.price}` : 'Consulte',
      regularPrice: product.regularPrice ? `R$ ${product.regularPrice}` : null,
      salePrice: product.salePrice ? `R$ ${product.salePrice}` : null,
      image: {
        sourceUrl: product.image?.sourceUrl || '/placeholder-product.jpg',
        altText: product.image?.altText || product.name
      },
      galleryImages: product.galleryImages?.nodes || [],
      productCategories: {
        nodes: product.productCategories?.nodes || []
      },
      sku: product.sku,
      onSale: product.onSale,
      featured: product.featured,
      stockStatus: product.stockStatus,
      reviews: product.reviews,
      related: product.related?.nodes || []
    };
  } catch (error) {
    console.warn('Failed to fetch single product:', error);
    return null;
  }
}

export async function fetchPosts() {
  try {
    console.log('Fetching posts from WordPress API...');
    const data = await graphqlClient.request(GET_POSTS, { first: 10 });
    console.log('Posts fetched successfully:', data.posts.nodes.length);
    return data.posts.nodes;
  } catch (error) {
    console.warn('Failed to fetch posts from WordPress API:', error);
    return [];
  }
}

// Test authentication
export async function testAuthConnection() {
  try {
    const testQuery = `
      query TestAuth {
        viewer {
          id
          name
          email
        }
      }
    `;
    const data = await graphqlClient.request(testQuery);
    console.log('Authentication successful:', data.viewer);
    return true;
  } catch (error) {
    console.warn('Authentication test failed:', error);
    return false;
  }
}