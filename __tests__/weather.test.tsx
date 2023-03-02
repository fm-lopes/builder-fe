import { render, screen } from '@testing-library/react';
import Zipcode from "../pages/weather/[zipcode]";

describe('Zipcode', () => {
  it('renders city name', () => {
    render(<Zipcode city={{ name: 'Berverly Hills' }} />);

    expect(screen.getByText('Berverly Hills')).toBeInTheDocument();
  });

  it('renders list', () => {
    render(<Zipcode list={[{ dt_txt: "2023-03-01 15:00:00", weather: [{ main: 'Rain' }] }]} />);

    expect(screen.getByText('01/03 15:00')).toBeInTheDocument();
  });
})