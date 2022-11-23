import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const correctNamePokemon = screen.getByTestId('pokemon-name');
    const correctTypePokemon = screen.getByTestId('pokemon-type');
    const correctAverage = screen.getByText(/average weight: 6\.0 kg/i);
    const imgPokemon = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(correctNamePokemon).toBeInTheDocument();
    expect(correctNamePokemon.textContent).toBe('Pikachu');
    expect(correctTypePokemon).toBeInTheDocument();
    expect(correctTypePokemon.textContent).toBe('Electric');
    expect(correctAverage).toBeInTheDocument();
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon.alt).toBe('Pikachu sprite');
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails.href).toBe('http://localhost/pokemon/25');
    const splited = (+linkMoreDetails.href.split('/')[4]);
    const pokemonId = pokemonList[0].id;
    expect(splited).toBe(pokemonId);
  });
  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const splited = (+linkMoreDetails.href.split('/')[4]);
    expect(history.location.pathname).toBe(`/pokemon/${splited}`);
  });
  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    const starIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src).toBe('http://localhost/star-icon.svg');
    expect(starIcon.alt).toBe('Pikachu is marked as favorite');
  });
});
