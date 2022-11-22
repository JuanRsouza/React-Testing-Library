import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    const p1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const p2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    const img = screen.getByRole('img', {
      name: /pokédex/i,
      src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    });
    expect(heading).toBeInTheDocument();
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
