/* eslint-disable no-console */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PartDescriptor from '../components/PartDescriptor';
import { addPart, decrementPart, incrementPart } from '../actions/parts';
import { partsSelector } from '../selectors/local';

import './Home.sass';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState<string>(null);
  const [newPartName, setNewPartName] = useState('');
  const [error, setError] = useState('');
  const parts = useSelector(partsSelector);
  const dispatch = useDispatch();


  const handleCreateNewPart = () => {
    if (newPartName.trim() !== '') {
      // Check if the part name already exists
      if (parts.some(part => part.name === newPartName)) {
        setError('Part with the same name already exists.');
      } else {
        setError('');
        dispatch(addPart(newPartName));
        setNewPartName('');
      }
    }
  };

  return (
    <div>
      <h1>Parts Counter</h1>
      <hr />
      <ul className="partsList">
        {parts.map(part => (
          <li key={part.name} onClick={() => setSelectedPart(part.name)} className={selectedPart === part.name ? 'selected' : ''}>
            {part.name} {part.amount}
            <button
              onClick={ e => {
                e.stopPropagation();
                dispatch(incrementPart(part.name));
              }}
            >
              +
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                dispatch(decrementPart(part.name));
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Part Info</h2>
      {selectedPart &&
        (() => {
          const part = parts.find(x => x.name === selectedPart);
          return <PartDescriptor
            key={selectedPart}
            name={part.name}
            amount={part.amount} />;
        })()}
      <hr />
      <h2>Add Part</h2>
      <div>
        <input
          type="text"
          placeholder="New Part Name"
          value={newPartName}
          onChange={e => setNewPartName(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              handleCreateNewPart();
            }
          }}
        />
        <button onClick={handleCreateNewPart}>Create Part</button>
        <br />
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Home;
