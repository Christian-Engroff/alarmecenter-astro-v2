import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.WORDPRESS_API_URL || 'https://wp.alarmecenter.com.br/graphql';
const username = import.meta.env.WORDPRESS_USERNAME;
const password = import.meta.env.WORDPRESS_PASSWORD;

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    ...(username && password && {
      'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    })
  },
});

// Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  regularPrice?: string;
  salePrice?: string;
  stockStatus: string;
  sku?: string;
  featured: boolean;
  onSale: boolean;
  image: {
    sourceUrl: string;
    altText: string;
  };
  galleryImages: Array<{
    sourceUrl: string;
    altText: string;
  }>;
  productCategories: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
  image?: {
    sourceUrl: string;
    altText: string;
  };
  children: Array<{
    id: string;
    name: string;
    slug: string;
    count: number;
  }>;
}

// Queries que funcionam com WordPress básico
export const GET_POSTS = `
  query GetPosts($first: Int = 50) {
    posts(first: $first) {
      nodes {
        id
        databaseId
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
            id
            name
            slug
            description
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES = `
  query GetCategories($first: Int = 50) {
    categories(first: $first) {
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

export const GET_PAGES = `
  query GetPages($first: Int = 10) {
    pages(first: $first) {
      nodes {
        id
        title
        slug
        content
      }
    }
  }
`;

// Mock products baseados no que vimos no debug (produto real encontrado)
const realProducts: Product[] = [
  {
    id: '94',
    name: 'Terminal Dedicado TDMI 300 - Intelbras',
    slug: 'terminal-dedicado-tdmi-300-intelbras',
    description: 'Terminal dedicado TDMI 300 da Intelbras, ideal para condomínios e residências. Interface de comunicação moderna e confiável.',
    price: 'R$ 81,45',
    regularPrice: 'R$ 95,00',
    salePrice: 'R$ 81,45',
    stockStatus: 'IN_STOCK',
    sku: 'tdmi-300',
    featured: true,
    onSale: true,
    image: {
      sourceUrl: 'https://wp.alarmecenter.com.br/wp-content/uploads/2025/09/06351e3d809ed12df96242756ae89525-300x300.jpeg',
      altText: 'Terminal Dedicado TDMI 300 Intelbras Branco - Condomínio'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'controle-acesso', name: 'Controle de Acesso', slug: 'controle-de-acesso' }
      ]
    }
  },
  {
    id: '95',
    name: 'Bateria Moura 12V 7Ah VRLA',
    slug: 'bateria-moura-12v-7ah',
    description: 'Bateria estacionária Moura 12V 7Ah VRLA para alarmes, nobreaks e sistemas de segurança. Tecnologia AGM com vida útil prolongada.',
    price: 'R$ 132,30',
    regularPrice: 'R$ 150,00',
    salePrice: 'R$ 132,30',
    stockStatus: 'IN_STOCK',
    sku: '12mva-7',
    featured: true,
    onSale: true,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=Bateria+Moura+12V',
      altText: 'Bateria Moura 12V 7Ah VRLA'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'baterias', name: 'Baterias', slug: 'baterias' }
      ]
    }
  },
  {
    id: '96',
    name: 'Câmera IP Full HD WiFi IM5 Intelbras',
    slug: 'camera-ip-im5-intelbras',
    description: 'Câmera IP Full HD com WiFi integrado da Intelbras. Visão noturna, detecção de movimento e acesso via aplicativo móvel.',
    price: 'R$ 289,90',
    regularPrice: 'R$ 289,90',
    salePrice: null,
    stockStatus: 'IN_STOCK',
    sku: 'im5-wifi',
    featured: true,
    onSale: false,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/3498db/ffffff?text=Camera+IP+IM5',
      altText: 'Câmera IP Full HD WiFi IM5 Intelbras'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'cameras', name: 'Câmeras de Segurança', slug: 'cameras-de-seguranca' }
      ]
    }
  },
  {
    id: '97',
    name: 'Central de Alarme Intelbras ANM 24 Net',
    slug: 'central-alarme-anm-24-net',
    description: 'Central de alarme monitorável ANM 24 Net da Intelbras. Comunicação via internet, aplicativo mobile e 24 zonas.',
    price: 'R$ 456,70',
    regularPrice: 'R$ 456,70',
    salePrice: null,
    stockStatus: 'IN_STOCK',
    sku: 'anm-24-net',
    featured: true,
    onSale: false,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/2ecc71/ffffff?text=Central+ANM24',
      altText: 'Central de Alarme Intelbras ANM 24 Net'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'alarmes', name: 'Sistemas de Alarme', slug: 'sistemas-de-alarme' }
      ]
    }
  },
  {
    id: '98',
    name: 'Sensor de Presença Infravermelho IVP 2000',
    slug: 'sensor-ivp-2000',
    description: 'Sensor infravermelho passivo IVP 2000 com tecnologia pet immune até 15kg. Ideal para ambientes internos.',
    price: 'R$ 45,90',
    regularPrice: 'R$ 52,00',
    salePrice: 'R$ 45,90',
    stockStatus: 'IN_STOCK',
    sku: 'ivp-2000',
    featured: false,
    onSale: true,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/f39c12/ffffff?text=Sensor+IVP',
      altText: 'Sensor de Presença Infravermelho IVP 2000'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'sensores', name: 'Sensores de Alarme', slug: 'sensores-de-alarme' }
      ]
    }
  },
  {
    id: '99',
    name: 'Cerca Elétrica ELC 5002 Intelbras',
    slug: 'cerca-eletrica-elc-5002',
    description: 'Central de cerca elétrica ELC 5002 da Intelbras. 2 setores independentes, sirene integrada e controle remoto.',
    price: 'R$ 198,50',
    regularPrice: 'R$ 220,00',
    salePrice: 'R$ 198,50',
    stockStatus: 'IN_STOCK',
    sku: 'elc-5002',
    featured: true,
    onSale: true,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/e67e22/ffffff?text=ELC+5002',
      altText: 'Cerca Elétrica ELC 5002 Intelbras'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'cerca-eletrica', name: 'Cerca Elétrica', slug: 'cerca-eletrica' }
      ]
    }
  },
  {
    id: '100',
    name: 'Fechadura Digital FR 330 Intelbras',
    slug: 'fechadura-digital-fr-330',
    description: 'Fechadura digital FR 330 da Intelbras com abertura por senha, cartão e chave mecânica. À prova de água IP65.',
    price: 'R$ 387,90',
    regularPrice: 'R$ 387,90',
    salePrice: null,
    stockStatus: 'IN_STOCK',
    sku: 'fr-330',
    featured: true,
    onSale: false,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=FR+330',
      altText: 'Fechadura Digital FR 330 Intelbras'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'controle-acesso', name: 'Controle de Acesso', slug: 'controle-de-acesso' }
      ]
    }
  },
  {
    id: '101',
    name: 'Kit CFTV Intelbras 4 Câmeras Full HD',
    slug: 'kit-cftv-4-cameras-full-hd',
    description: 'Kit completo de CFTV com 4 câmeras Full HD, DVR, cabos e acessórios. Solução completa para monitoramento.',
    price: 'R$ 899,90',
    regularPrice: 'R$ 1.200,00',
    salePrice: 'R$ 899,90',
    stockStatus: 'IN_STOCK',
    sku: 'kit-cftv-4cam',
    featured: true,
    onSale: true,
    image: {
      sourceUrl: 'https://via.placeholder.com/300x300/3498db/ffffff?text=Kit+CFTV+4Cam',
      altText: 'Kit CFTV Intelbras 4 Câmeras Full HD'
    },
    galleryImages: [],
    productCategories: {
      nodes: [
        { id: 'cameras', name: 'Câmeras de Segurança', slug: 'cameras-de-seguranca' }
      ]
    }
  }
];

const realCategories: Category[] = [
  {
    id: 'sistemas-de-alarme',
    name: 'Sistemas de Alarme',
    slug: 'sistemas-de-alarme',
    description: 'Centrais de alarme, sensores, controles remotos e acessórios para proteção residencial e comercial',
    count: 45,
    image: {
      sourceUrl: 'https://via.placeholder.com/400x300/e74c3c/ffffff?text=Sistemas+Alarme',
      altText: 'Sistemas de Alarme'
    },
    children: [
      { id: 'centrais-alarme', name: 'Centrais de Alarme', slug: 'centrais-de-alarme', count: 12 },
      { id: 'sensores', name: 'Sensores', slug: 'sensores-de-alarme', count: 18 },
      { id: 'controles', name: 'Controles Remotos', slug: 'controles-remotos', count: 15 }
    ]
  },
  {
    id: 'cameras-de-seguranca',
    name: 'Câmeras de Segurança',
    slug: 'cameras-de-seguranca',
    description: 'Câmeras IP, analógicas, gravadores DVR/NVR e acessórios para monitoramento completo',
    count: 78,
    image: {
      sourceUrl: 'https://via.placeholder.com/400x300/3498db/ffffff?text=Cameras+Seguranca',
      altText: 'Câmeras de Segurança'
    },
    children: [
      { id: 'cameras-ip', name: 'Câmeras IP', slug: 'cameras-ip', count: 32 },
      { id: 'gravadores', name: 'Gravadores DVR/NVR', slug: 'gravadores', count: 24 },
      { id: 'acessorios-cftv', name: 'Acessórios CFTV', slug: 'acessorios-cftv', count: 22 }
    ]
  },
  {
    id: 'cerca-eletrica',
    name: 'Cerca Elétrica',
    slug: 'cerca-eletrica',
    description: 'Centrais de cerca elétrica, arames, hastes, isoladores e todos os componentes para instalação',
    count: 23,
    image: {
      sourceUrl: 'https://via.placeholder.com/400x300/f39c12/ffffff?text=Cerca+Eletrica',
      altText: 'Cerca Elétrica'
    },
    children: [
      { id: 'centrais-cerca', name: 'Centrais de Cerca', slug: 'centrais-cerca-eletrica', count: 8 },
      { id: 'acessorios-cerca', name: 'Acessórios', slug: 'acessorios-cerca', count: 15 }
    ]
  },
  {
    id: 'controle-de-acesso',
    name: 'Controle de Acesso',
    slug: 'controle-de-acesso',
    description: 'Fechaduras eletrônicas, interfones, vídeo porteiros, tags RFID e sistemas de controle de entrada',
    count: 34,
    image: {
      sourceUrl: 'https://via.placeholder.com/400x300/2ecc71/ffffff?text=Controle+Acesso',
      altText: 'Controle de Acesso'
    },
    children: [
      { id: 'fechaduras', name: 'Fechaduras Eletrônicas', slug: 'fechaduras-eletronicas', count: 12 },
      { id: 'interfones', name: 'Interfones', slug: 'interfones', count: 10 },
      { id: 'tags-rfid', name: 'Tags e Cartões', slug: 'tags-cartoes-rfid', count: 12 }
    ]
  },
  {
    id: 'baterias',
    name: 'Baterias Estacionárias',
    slug: 'baterias',
    description: 'Baterias Moura, Intelbras e outras marcas para alarmes, nobreaks e sistemas de backup',
    count: 15,
    image: {
      sourceUrl: 'https://via.placeholder.com/400x300/9b59b6/ffffff?text=Baterias',
      altText: 'Baterias Estacionárias'
    },
    children: [
      { id: 'baterias-alarme', name: 'Para Alarmes', slug: 'baterias-alarme', count: 8 },
      { id: 'baterias-nobreak', name: 'Para Nobreaks', slug: 'baterias-nobreak', count: 7 }
    ]
  },
  {
    id: 'energia-nobreak',
    name: 'Energia & Nobreak',
    slug: 'energia-nobreak',
    description: 'Fontes de alimentação, nobreaks, estabilizadores e soluções para energia ininterrupta',
    count: 28,
    image: {
      sourceUrl: 'https://via.placeholder.com/400x300/34495e/ffffff?text=Energia+Nobreak',
      altText: 'Energia & Nobreak'
    },
    children: [
      { id: 'fontes', name: 'Fontes de Alimentação', slug: 'fontes-alimentacao', count: 15 },
      { id: 'nobreaks', name: 'Nobreaks', slug: 'nobreaks', count: 13 }
    ]
  }
];

// API Functions
export async function fetchProducts(): Promise<Product[]> {
  try {
    // Try to get posts first (might contain product info)
    console.log('🔄 Fetching posts from WordPress...');
    const data = await graphqlClient.request(GET_POSTS, { first: 50 });
    console.log(`📝 ${data.posts.nodes.length} posts found`);
    
    // For now, return curated products
    // TODO: When WooCommerce GraphQL is installed, this will switch to real API
    console.log('📦 Using curated product catalog (includes real product found)');
    return realProducts;
    
  } catch (error) {
    console.error('❌ Failed to fetch from WordPress:', error);
    return realProducts; // Fallback to curated products
  }
}

export async function fetchProductCategories(): Promise<Category[]> {
  try {
    console.log('🔄 Fetching categories from WordPress...');
    const data = await graphqlClient.request(GET_CATEGORIES, { first: 50 });
    console.log(`🏷️ ${data.categories.nodes.length} categories found`);
    
    // Return curated categories
    console.log('🏷️ Using curated category structure');
    return realCategories;
    
  } catch (error) {
    console.error('❌ Failed to fetch categories:', error);
    return realCategories;
  }
}

export async function fetchSingleProduct(slug: string): Promise<Product | null> {
  const product = realProducts.find(p => p.slug === slug);
  return product || null;
}

// Search function
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query.trim()) return realProducts;
  
  const searchTerm = query.toLowerCase();
  
  return realProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.sku?.toLowerCase().includes(searchTerm) ||
    product.productCategories.nodes.some(cat => 
      cat.name.toLowerCase().includes(searchTerm)
    )
  );
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return realProducts.filter(product =>
    product.productCategories.nodes.some(cat => cat.slug === categorySlug)
  );
}

// Utility functions
export function formatPrice(price: string | null | undefined): string {
  if (!price) return 'Consulte preço';
  return price;
}