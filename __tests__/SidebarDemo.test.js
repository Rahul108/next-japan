import { render, screen, fireEvent } from '@testing-library/react';
import { SidebarDemo } from '../src/app/component/Navigation/SidebarDemo';

// Mock the motion import
jest.mock('motion/react', () => ({
  motion: {
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
}));

// Mock the icons
jest.mock('@tabler/icons-react', () => ({
  IconBrandTabler: () => <div data-testid="icon-brand-tabler">Icon</div>,
  IconSettings: () => <div data-testid="icon-settings">Settings Icon</div>,
}));

jest.mock('lucide-react', () => ({
  BadgeDollarSign: () => <div data-testid="badge-dollar-sign">Badge</div>,
  Blend: () => <div data-testid="blend">Blend</div>,
  ListTodo: () => <div data-testid="list-todo">Todo</div>,
  TicketX: () => <div data-testid="ticket-x">Ticket</div>,
}));

// Mock the UI components
jest.mock('../src/app/component/ui/sidebar', () => ({
  Sidebar: ({ children, open, setOpen }) => (
    <div data-testid="sidebar" data-open={open}>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {children}
    </div>
  ),
  SidebarBody: ({ children, className }) => (
    <div data-testid="sidebar-body" className={className}>
      {children}
    </div>
  ),
  SidebarLink: ({ link }) => (
    <a href={link.href} data-testid="sidebar-link">
      {link.icon}
      <span>{link.label}</span>
    </a>
  ),
}));

// Mock the Navbar component
jest.mock('../src/app/component/Navigation/Navbar', () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navigation</nav>;
  };
});

describe('SidebarDemo', () => {
  const mockChildren = <div>Test Content</div>;

  beforeEach(() => {
    // Clear any mocks before each test
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    expect(screen.getByText('features-1')).toBeInTheDocument();
    expect(screen.getByText('features-2')).toBeInTheDocument();
    expect(screen.getByText('features-3')).toBeInTheDocument();
    expect(screen.getByText('features-4')).toBeInTheDocument();
    expect(screen.getByText('features-5')).toBeInTheDocument();
  });

  test('renders settings link', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('sidebar toggle functionality', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    const sidebar = screen.getByTestId('sidebar');
    const toggleButton = screen.getByText('Toggle');
    
    // Initially closed
    expect(sidebar).toHaveAttribute('data-open', 'false');
    
    // Click to open
    fireEvent.click(toggleButton);
    expect(sidebar).toHaveAttribute('data-open', 'true');
    
    // Click to close
    fireEvent.click(toggleButton);
    expect(sidebar).toHaveAttribute('data-open', 'false');
  });

  test('renders navbar component', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  test('renders children content', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('has correct navigation links structure', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    const links = screen.getAllByTestId('sidebar-link');
    expect(links).toHaveLength(6); // 5 feature links + 1 settings link
  });

  test('Logo component renders brand name when expanded', () => {
    render(<SidebarDemo>{mockChildren}</SidebarDemo>);
    
    // The Logo should be present with brand text
    expect(screen.getByText('Brand Logo')).toBeInTheDocument();
  });
});

describe('Logo Component', () => {
  test('renders logo with brand text', () => {
    const { Logo } = require('../src/app/component/Navigation/SidebarDemo');
    render(<Logo />);
    
    expect(screen.getByText('Brand Logo')).toBeInTheDocument();
  });
});

describe('LogoIcon Component', () => {
  test('renders logo icon without text', () => {
    const { LogoIcon } = require('../src/app/component/Navigation/SidebarDemo');
    render(<LogoIcon />);
    
    const logoIcon = screen.getByTitle('Home');
    expect(logoIcon).toBeInTheDocument();
  });
});
