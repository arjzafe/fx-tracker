import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

// Mock the theme provider for testing
const MockThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div data-testid="theme-provider">{children}</div>
}

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MockThemeProvider>
        <App />
      </MockThemeProvider>
    )
    
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('displays the count button', () => {
    render(
      <MockThemeProvider>
        <App />
      </MockThemeProvider>
    )
    
    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()
  })

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <MockThemeProvider>
        <App />
      </MockThemeProvider>
    )
    
    const button = screen.getByRole('button', { name: /count is 0/i })
    await user.click(button)
    
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })
})
