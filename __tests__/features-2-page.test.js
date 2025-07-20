import { render, screen } from '@testing-library/react';
import Page from '../src/app/features-2/page';

// Mock the FuelComparison component
jest.mock('../src/app/component/ui/FuelComparison', () => {
  return function MockFuelComparison() {
    return <div data-testid="fuel-comparison">Fuel Comparison Component</div>;
  };
});

describe('Features-2 Page', () => {
  test('renders without crashing', () => {
    render(<Page />);
    expect(screen.getByTestId('fuel-comparison')).toBeInTheDocument();
  });

  test('renders FuelComparison component', () => {
    render(<Page />);
    
    const fuelComparisonComponent = screen.getByTestId('fuel-comparison');
    expect(fuelComparisonComponent).toBeInTheDocument();
    expect(fuelComparisonComponent).toHaveTextContent('Fuel Comparison Component');
  });

  test('page structure is correct', () => {
    render(<Page />);
    
    // The page should only contain the FuelComparison component
    const pageContainer = screen.getByTestId('fuel-comparison').parentElement;
    expect(pageContainer.children).toHaveLength(1);
  });
});
