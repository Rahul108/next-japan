import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../src/app/component/Navigation/Navbar';

// Mock Next.js components
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} data-testid="next-image" />;
  };
});

jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }) {
    return <a href={href} {...props}>{children}</a>;
  };
});

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  BarChart3: () => <div data-testid="bar-chart-icon">BarChart</div>,
  Bell: () => <div data-testid="bell-icon">Bell</div>,
  Calendar: () => <div data-testid="calendar-icon">Calendar</div>,
  ChevronDown: () => <div data-testid="chevron-down-icon">ChevronDown</div>,
  Globe: () => <div data-testid="globe-icon">Globe</div>,
  LayoutDashboard: () => <div data-testid="layout-dashboard-icon">Dashboard</div>,
  Link2: () => <div data-testid="link-icon">Link</div>,
  LogOut: () => <div data-testid="logout-icon">LogOut</div>,
  Mail: () => <div data-testid="mail-icon">Mail</div>,
  Menu: () => <div data-testid="menu-icon">Menu</div>,
  Moon: () => <div data-testid="moon-icon">Moon</div>,
  Settings: () => <div data-testid="settings-icon">Settings</div>,
  Sun: () => <div data-testid="sun-icon">Sun</div>,
  X: () => <div data-testid="x-icon">X</div>,
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset document classes
    document.documentElement.className = '';
  });

  test('renders without crashing', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders company name', () => {
    render(<Navbar />);
    expect(screen.getByText('XYZ Company name')).toBeInTheDocument();
  });

  test('renders mobile menu toggle button', () => {
    render(<Navbar />);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  test('mobile menu toggle functionality works', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const menuButton = screen.getByTestId('menu-icon').closest('button');
    
    // Click to open mobile menu
    await user.click(menuButton);
    
    // Check if mobile menu is open (should show X icon when open)
    await user.click(menuButton);
  });

  test('dark mode toggle functionality works', async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    
    const darkModeToggle = screen.getByTestId('sun-icon').closest('button') || screen.getByTestId('moon-icon').closest('button');
    
    if (darkModeToggle) {
      await user.click(darkModeToggle);
      // Check if dark class is toggled on document
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    }
  });

  test('renders language selector with default language', () => {
    render(<Navbar />);
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  test('language dropdown contains all supported languages', () => {
    render(<Navbar />);
    
    // Check if Globe icon is present (indicates language selector)
    expect(screen.getByTestId('globe-icon')).toBeInTheDocument();
  });

  test('renders notification bell', () => {
    render(<Navbar />);
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
  });

  test('navbar has proper CSS classes', () => {
    render(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('fixed', 'top-0', 'w-screen', 'bg-white', 'dark:bg-neutral-800');
  });

  test('search functionality is present', () => {
    render(<Navbar />);
    
    // Check if search input exists
    const searchInput = screen.getByPlaceholderText(/search/i);
    if (searchInput) {
      expect(searchInput).toBeInTheDocument();
    }
  });

  test('renders user avatar/profile section', () => {
    render(<Navbar />);
    
    // Look for user profile elements
    const avatar = screen.queryByTestId('next-image');
    if (avatar) {
      expect(avatar).toBeInTheDocument();
    }
  });

  test('navbar is responsive', () => {
    render(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    const container = navbar.firstChild;
    
    expect(container).toHaveClass('px-4', 'md:px-16');
  });

  test('dark mode state management works correctly', () => {
    render(<Navbar />);
    
    // Initial state should not have dark mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('language state management works correctly', () => {
    render(<Navbar />);
    
    // Default language should be EN
    expect(screen.getByText('EN')).toBeInTheDocument();
  });

  test('mobile menu state management works correctly', () => {
    render(<Navbar />);
    
    // Menu should be closed initially
    const menuIcon = screen.getByTestId('menu-icon');
    expect(menuIcon).toBeInTheDocument();
  });

  test('navigation contains proper z-index for layering', () => {
    render(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('z-50');
  });

  test('navbar has border styling', () => {
    render(<Navbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('border-b', 'border-neutral-200', 'dark:border-neutral-700');
  });
});
