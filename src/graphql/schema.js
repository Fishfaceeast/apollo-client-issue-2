import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} from 'graphql';

const macPro = {
  id: 1,
  name: 'Mac Pro',
  vendor: 'Apple',
  core: {
    cpu: {
      priceInfo: {
        rawPrice: 1600
      },
      model: 'Intel Xeon',
      clockSpeed: 3500
    }
  }
}

const PriceInfoType = new GraphQLObjectType({
  name: 'PriceInfoType',
  fields: {
    rawPrice: {
      type: GraphQLString,
    }
  }
})
const ProcessorType = new GraphQLObjectType({
  name: 'ProcessorType',
  fields: {
    priceInfo: {
      type: PriceInfoType,
    },
    model: {
      type: GraphQLString,
    },
    clockSpeed: {
      type: GraphQLInt,
    }
  }
})

const CoreType = new GraphQLObjectType({
  name: 'CoreType',
  fields: {
    cpu: {
      type: ProcessorType,
    }
  }
}) 


const ComputerType = new GraphQLObjectType({
  name: 'ComputerType',
  fields: {
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    core: {
      type: CoreType,
    }
  }
})

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    computer: {
      type: ComputerType,
      resolve() { return macPro }
    }
  }
});

export const schema = new GraphQLSchema({ query: QueryType });
