import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const DATA_WITHOUT_PRICE_QUERY = gql`
  query PartData {
    computer {
      id
      name
      core {
        cpu {
          model
          clockSpeed
        }  
      }
      
    }
  }
`;

const MODEL_AND_PRICE_QUERY = gql`
  query ModelAndPrice {
    computer {
      id
      core {
        cpu {
          priceInfo { 
            rawPrice
          }
          model
        }  
      }
    }
  }
`;

const CLOCK_SPEED_QUERY = gql`
  query ClockSpeed {
    computer {
      id
      core {
        cpu {
          clockSpeed
        }  
      }
    }
  }
`;

function Model() {
  const {
    loading,
    data
  } = useQuery(MODEL_AND_PRICE_QUERY, { fetchPolicy: 'cache-first' });

  console.log('MODEL_QUERY:', { loading, data });

  return loading ? 'loading...' : (
    <ul>
      <li>{`CPU model: ${data.computer.core.cpu.model}`}</li>
      <li>{`CPU price: ${data.computer.core.cpu.priceInfo.rawPrice}`}</li>
    </ul>
  )
}

function ClockSpeed() {
  /**
   * Instead of merging the 'cpu' field in cache it gets overwritten by a new object,
   * losing previously stored values ('model' field in this example).
   */
  const {
    loading,
    data
  } = useQuery(CLOCK_SPEED_QUERY, { fetchPolicy: 'cache-first' });

  console.log('CLOCK_SPEED_QUERY:', { loading, data });

  return loading ? 'loading...' : (
    <ul>
      <li>{`Clock speed: ${data.computer.core.cpu.clockSpeed} MHz`}</li>
    </ul>
  )
}

export default function App() {
  const {
    loading,
    data
  } = useQuery(DATA_WITHOUT_PRICE_QUERY);
  const [item, setItem] = useState('');

  return (
    <main>
      <h1>Apollo Client Issue Reproduction</h1>
      <p>
        This application can be used to demonstrate an error in Apollo Client.
      </p>
      <h2>Computer Info</h2>
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div>
          <h3>{data.computer.name}</h3>
          <button onClick={() => setItem('model')}>Model & Price</button>
          <button onClick={() => setItem('clock-speed')}>Clock speed</button>
          {item === 'model' && <Model />}
          {item === 'clock-speed' && <ClockSpeed />}
        </div> 
      )}
    </main>
  );
}
