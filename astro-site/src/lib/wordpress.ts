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

// GraphQL Queries - Updated for WooCommerce
export const GET_PRODUCTS = `
  query GetProducts($first: Int = 50) {
    products(first: $first) {
      nodes {
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
        ... on VariableProduct {
          price
          regularPrice
          salePrice
          stockStatus
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
        sku
        status
        catalogVisibility
        featured
        onSale
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

// API Functions
export async function fetchProducts() {
  try {
    const data = await graphqlClient.request(GET_PRODUCTS);
    return data.products.nodes;
  } catch (error) {
    console.warn('Failed to fetch products from WordPress API, using mock data:', error);
    return mockProducts;
  }
}

export async function fetchProductCategories() {
  try {
    const data = await graphqlClient.request(GET_PRODUCT_CATEGORIES);
    return data.productCategories.nodes;
  } catch (error) {
    console.warn('Failed to fetch categories from WordPress API, using mock data:', error);
    return mockCategories;
  }
}

export async function fetchPosts() {
  try {
    const data = await graphqlClient.request(GET_POSTS);
    return data.posts.nodes;
  } catch (error) {
    console.warn('Failed to fetch posts from WordPress API:', error);
    return [];
  }
}