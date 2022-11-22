import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente App', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.queryByRole('link', {
      name: /home/i,
    });
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const linkFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });
  it(
    'Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/');
      });
      expect(history.location.pathname).toBe('/');
    },
  );
  it(
    'Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/about');
      });
      expect(history.location.pathname).toBe('/about');
    },
  );
  it(
    'Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/favorites');
      });
      expect(history.location.pathname).toBe('/favorites');
    },
  );
  it(
    'Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/xablau');
      });
      expect(history.location.pathname).toBe('/xablau');
    },
  );
});
