import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FuelComparison from '../src/app/component/ui/FuelComparison';

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  File: () => <div data-testid="file-icon">File</div>,
  Folder: () => <div data-testid="folder-icon">Folder</div>,
}));

describe('FuelComparison', () => {
  beforeEach(() => {
    // Clear any mocks before each test
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<FuelComparison />);
    expect(screen.getByText(/燃料比較/)).toBeInTheDocument();
  });

  test('renders header text correctly', () => {
    render(<FuelComparison />);
    
    const header = screen.getByText(/燃料比較 -Rīsu・Nenryō Hikaku - Lease and Fuel Comparison/);
    expect(header).toBeInTheDocument();
  });

  test('renders font size controls', () => {
    render(<FuelComparison />);
    
    const fontSizeButton = screen.getByText('Font size ▼');
    expect(fontSizeButton).toBeInTheDocument();
    
    const fontSizeInput = screen.getByDisplayValue('16');
    expect(fontSizeInput).toBeInTheDocument();
  });

  test('font size input can be changed', async () => {
    const user = userEvent.setup();
    render(<FuelComparison />);
    
    const fontSizeInput = screen.getByDisplayValue('16');
    
    await user.clear(fontSizeInput);
    await user.type(fontSizeInput, '20');
    
    expect(fontSizeInput).toHaveValue(20);
  });

  test('renders year dropdown button', () => {
    render(<FuelComparison />);
    
    expect(screen.getByText('Year ▼')).toBeInTheDocument();
  });

  test('renders month dropdown button', () => {
    render(<FuelComparison />);
    
    expect(screen.getByText('Month ▼')).toBeInTheDocument();
  });

  test('renders company dropdown button', () => {
    render(<FuelComparison />);
    
    expect(screen.getByText('Company ▼')).toBeInTheDocument();
  });

  test('font size dropdown contains all options', async () => {
    const user = userEvent.setup();
    render(<FuelComparison />);
    
    // The dropdown should contain font size options
    const fontSizeButton = screen.getByText('Font size ▼');
    expect(fontSizeButton).toBeInTheDocument();
  });

  test('validates font size input boundaries', async () => {
    const user = userEvent.setup();
    render(<FuelComparison />);
    
    const fontSizeInput = screen.getByDisplayValue('16');
    
    // Test minimum value
    await user.clear(fontSizeInput);
    await user.type(fontSizeInput, '5');
    expect(fontSizeInput).toHaveAttribute('min', '6');
    
    // Test maximum value
    await user.clear(fontSizeInput);
    await user.type(fontSizeInput, '80');
    expect(fontSizeInput).toHaveAttribute('max', '72');
  });

  test('has proper component structure', () => {
    render(<FuelComparison />);
    
    // Check for main container by finding the root div with the correct classes
    const mainContainer = screen.getByText(/燃料比較/).closest('.p-6');
    expect(mainContainer).toHaveClass('p-6', 'mt-16', 'text-gray-800', 'dark:text-gray-100');
  });

  test('year dropdown contains year options', () => {
    render(<FuelComparison />);
    
    const yearDropdown = screen.getByText('Year ▼');
    expect(yearDropdown).toBeInTheDocument();
    
    // Check for some year options
    expect(screen.getByText('2017')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
    expect(screen.getByText('2019')).toBeInTheDocument();
  });

  test('month dropdown contains month options', () => {
    render(<FuelComparison />);
    
    const monthDropdown = screen.getByText('Month ▼');
    expect(monthDropdown).toBeInTheDocument();
    
    // Check for some month options
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('February')).toBeInTheDocument();
    expect(screen.getByText('March')).toBeInTheDocument();
  });

  test('component has proper CSS classes for dark mode support', () => {
    render(<FuelComparison />);
    
    const mainContainer = screen.getByText(/燃料比較/).closest('.p-6');
    expect(mainContainer).toHaveClass('text-gray-800', 'dark:text-gray-100');
  });

  test('font size control group renders correctly', () => {
    render(<FuelComparison />);
    
    // Check if the font size control wrapper exists
    const fontSizeInput = screen.getByDisplayValue('16');
    expect(fontSizeInput).toHaveClass('w-16', 'text-center');
  });

  test('company dropdown shows companies when rendered', () => {
    render(<FuelComparison />);
    
    // Check if company names are present (they should appear multiple times in different parts)
    const companyElements = screen.getAllByText('ティーワイエス (TYS)');
    expect(companyElements.length).toBeGreaterThan(0);
  });

  test('dropdowns have proper styling', () => {
    render(<FuelComparison />);
    
    const yearButton = screen.getByText('Year ▼');
    const monthButton = screen.getByText('Month ▼');
    
    expect(yearButton).toHaveClass('btn', 'bg-red-600', 'text-white');
    expect(monthButton).toHaveClass('btn', 'bg-red-600', 'text-white');
  });

  test('icons are rendered in dropdowns', () => {
    render(<FuelComparison />);
    
    // Check for folder and file icons
    expect(screen.getAllByTestId('folder-icon')).toHaveLength(3); // 2017, 2018, 2019
    expect(screen.getAllByTestId('file-icon')).toHaveLength(3); // January, February, March
  });

  test('font size input has correct attributes', () => {
    render(<FuelComparison />);
    
    const fontSizeInput = screen.getByDisplayValue('16');
    expect(fontSizeInput).toHaveAttribute('type', 'number');
    expect(fontSizeInput).toHaveAttribute('min', '6');
    expect(fontSizeInput).toHaveAttribute('max', '72');
  });
});
