import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const headingH2 = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(headingH2).toBeInTheDocument();
  });
  it('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    pokemonList.forEach(({ name }) => {
      const pokemonName = screen.getByText(name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
    });
  });
  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pikachu = screen.getByText(pokemonList[0].name);
    pokemonList.forEach(({ name }) => {
      const pokemonName = screen.getByText(name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextButton);
      if (name === pokemonList[pokemonList.length - 1].name) {
        expect(pikachu).toBeInTheDocument();
      }
    });
  });
  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allButtons = screen.queryAllByTestId('pokemon-type-button');
    allButtons.forEach((el) => {
      expect(el).toBeInTheDocument();
    });
  });
  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const mapedPokemonList = pokemonList.map((poke) => poke.type);
    const types = mapedPokemonList.filter((el, i) => mapedPokemonList.indexOf(el) === i);
    allButtons.forEach((el, i) => {
      expect(el.textContent).toBe(types[i]);
    });
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
  });
});
