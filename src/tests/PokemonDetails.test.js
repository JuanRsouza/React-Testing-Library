import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const nameDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(nameDetails).toBeInTheDocument();
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon.textContent).toBe('Pikachu');
    expect(linkMoreDetails).not.toBeInTheDocument();
    const heading = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    const paragraphAboutPokemon = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(paragraphAboutPokemon).toBeInTheDocument();
  });
  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const headeer = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(headeer).toBeInTheDocument();
    expect(headeer).toHaveTextContent('Pikachu');
    const location1 = screen.getByText(/kanto viridian forest/i);
    expect(location1).toBeInTheDocument();
    const location2 = screen.getByText(/kanto power plant/i);
    expect(location2).toBeInTheDocument();
    const imgs = screen.getAllByRole('img');
    expect(imgs[1].alt).toBe('Pikachu location');
    expect(imgs[2].alt).toBe('Pikachu location');
    expect(imgs[1].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgs[2].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(linkMoreDetails);
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBeTruthy();
    const starIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(starIcon).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(starIcon).not.toBeInTheDocument();
    const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeTruthy();
  });
});
