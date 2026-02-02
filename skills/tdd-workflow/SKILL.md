---
name: tdd-workflow
description: Test-driven development with 80%+ coverage.
user-invocable: true
---

# TDD Workflow

## Cycle

1. **RED** - Write failing test
2. **GREEN** - Write minimal code to pass
3. **REFACTOR** - Improve without changing behavior
4. **REPEAT**

## Test Types

| Type | Purpose | Tools |
|------|---------|-------|
| Unit | Functions, utilities | vitest, jest, pytest, go test |
| Integration | API endpoints, DB | supertest, httpx |
| E2E | User flows | Playwright |

## Coverage

- Minimum: 80%
- Focus: Critical paths, edge cases, error handling

## Test Pattern

```
describe('feature', () => {
  it('does expected behavior', () => {
    // Arrange
    const input = setupTestData()
    
    // Act
    const result = functionUnderTest(input)
    
    // Assert
    expect(result).toBe(expected)
  })
  
  it('handles edge case', () => { ... })
  it('handles error case', () => { ... })
})
```

## Mocking

Mock external dependencies (DB, APIs, file system) to isolate unit tests.

## Anti-Patterns

- Testing implementation details (test behavior, not internals)
- Brittle selectors (use data-testid or semantic selectors)
- Tests depending on each other (each test should be independent)
