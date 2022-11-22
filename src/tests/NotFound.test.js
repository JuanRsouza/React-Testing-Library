import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
