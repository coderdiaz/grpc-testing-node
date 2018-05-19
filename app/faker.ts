import 'dotenv/config'
import { resolve } from 'path'
import * as grpc from 'grpc'
import * as faker from 'faker'

// Variables
const PROTOFILE = process.env.PROTOFILE
const CUSTOM_PACKAGE = process.env.PACKAGE
const SERVICE = process.env.SERVICE
const GRPC_HOST = process.env.GRPC_HOST
const PROTO_PATH = resolve(__dirname, PROTOFILE)

// Loading protofile
const grpcClient = grpc.load(PROTO_PATH)[CUSTOM_PACKAGE]

// Client for test grpc requests
const client = new grpcClient[SERVICE](GRPC_HOST, grpc.credentials.createInsecure())

const getProperties = (id: String): any => {
  return [
    {
      id,
      property: 'author.name',
      value: faker.name.findName()
    },
    {
      id,
      property: 'author.slug',
      value: `${faker.name.lastName()}-${faker.name.firstName()}`.toLowerCase()
    },
    {
      id,
      property: 'seo.title',
      value: faker.lorem.words(7)
    },
    {
      id,
      property: 'seo.description',
      value: faker.lorem.sentences()
    },
    {
      id,
      property: 'seo.slug',
      value: faker.lorem.slug()
    },
    {
      id,
      property: 'ads.noBanners',
      value: `${faker.random.boolean()}`
    },
    {
      id,
      property: 'ads.isAdult',
      value: `${faker.random.boolean()}`
    },
    {
      id,
      property: 'ads.isCommercial',
      value: `${faker.random.boolean()}`
    },
    {
      id,
      property: 'ads.hasAdwords',
      value: `${faker.random.boolean()}`
    },
    {
      id,
      property: 'ads.adrenalineVideo',
      value: `${faker.random.boolean()}`
    },
    {
      id,
      property: 'ads.adUnit',
      value: faker.finance.iban()
    },
    {
      id,
      property: 'legacyId',
      value: `${faker.random.number()}`
    },
    {
      id,
      property: 'title',
      value: faker.lorem.words(7)
    },
    {
      id,
      property: 'subtitle',
      value: faker.lorem.words(10)
    },
    {
      id,
      property: 'content',
      value: faker.lorem.sentences(10)
    },
    {
      id,
      property: 'category',
      value: faker.company.bsAdjective()
    },
    {
      id,
      property: 'siteId',
      value: `${faker.random.number()}`
    },
    {
      id,
      property: 'type',
      value: faker.random.arrayElement(['POST', 'NEWS', 'VIDEO'])
    },
    {
      id,
      property: 'language',
      value: faker.random.arrayElement(['en', 'es'])
    },
    {
      id,
      property: 'status',
      value: faker.random.arrayElement(['PUBLISHED', 'REJECTED', 'CURATION', 'DRAFT'])
    },
    {
      id,
      property: 'cover',
      value: faker.image.imageUrl()
    },
  ]
}

const createArticle = () => {
  return new Promise((resolve, reject) => {
    client.createArticle({}, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })    
  })
}

const updateArticle = (properties) => {
  return new Promise((resolve, reject) => {
    client.updateArticle(properties, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

const addTag = (id: String) => {
  return new Promise((resolve, reject) => {
    client.addTag({
      id,
      name: `${faker.company.bsNoun()}`
    }, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

const addReference = (id: String) => {
  return new Promise((resolve, reject) => {
    client.addReference({
      id,
      title: faker.lorem.words(3),
      url: faker.internet.url()
    }, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

const addKeyword = (id: String) => {
  return new Promise((resolve, reject) => {
    client.addKeyword({
      id,
      name: faker.company.catchPhraseAdjective()
    }, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

const addProperty = (id: String) => {
  return new Promise((resolve, reject) => {
    client.addProperty({
      id,
      name: faker.database.column(),
      value: faker.company.bsBuzz()
    }, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

const addEditor = (id: String) => {
  return new Promise((resolve, reject) => {
    client.addEditor({
      id,
      name: faker.name.findName(),
      slug: `${faker.name.firstName()} ${faker.name.lastName()}`,
      type: faker.random.arrayElement(['EDITOR', 'CURATOR', 'SEO'])
    }, (err, response) => {
      if (err) reject(err)
      resolve(response)
    })
  })
}

const generateArticle = async (): Promise<any> => {
  // Creating article 
  const article: any = await createArticle()
  const properties = getProperties(article._id)
  properties.map(async (property) => {
    const updatedArticle = await updateArticle(property)
  })
  for (let i = 0; i < 10; i++) {
    await addTag(article._id)
    await addReference(article._id)
    await addKeyword(article._id)
    await addProperty(article._id)
  }
  for (let h = 0; h < 5; h++) {
    await addEditor(article._id)
  }
  return new Promise((resolve, reject) => {
    resolve()
  })
}

for (let j = 0; j < 10; j++) {
  generateArticle()
  console.log(`Generated ${j+1} articles document(s)`)
}