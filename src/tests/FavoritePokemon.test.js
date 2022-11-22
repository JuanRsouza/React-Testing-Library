import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    const notFoundPokemon = screen.getByText(/no favorite pokémon found/i);
    expect(notFoundPokemon).toBeInTheDocument();
  });
  it('Teste se são exibidos todos os cards de Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const buttonChosePokemon = screen.getByRole('button', {
      name: /electric/i,
    });
    userEvent.click(buttonChosePokemon);
    const pokemonName = screen.getByText(/pikachu/i);
    const averageWeigthPokemon = screen.getByText(/average weight: 6\.0 kg/i);
    const moreDetailsPokemon = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonName).toBeInTheDocument();
    expect(averageWeigthPokemon).toBeInTheDocument();
    expect(moreDetailsPokemon).toBeInTheDocument();
    userEvent.click(moreDetailsPokemon);
    const textCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(textCheckbox).toBeInTheDocument();
    const checkBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkBox);
    const favoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(favoritePokemon);
    act(() => {
      history.push('/favorites');
    });
    expect(history.location.pathname).toBe('/favorites');
    const favorited = screen.getAllByRole('img');
    expect(favorited).toHaveLength(2);
  });
});
