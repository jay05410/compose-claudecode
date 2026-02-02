# Step 05: Write Tests

## Objective
Ensure code quality through comprehensive testing.

## Actions

### 1. Invoke Test Engineer
Load test-engineer agent to create tests:
- Review implemented code
- Identify test scenarios
- Write tests following TDD principles

### 2. Unit Tests
Write unit tests for:
- Utility functions
- Business logic
- Data transformations

```typescript
describe('{function_name}', () => {
  it('handles happy path', () => { ... })
  it('handles edge case: empty input', () => { ... })
  it('handles error case', () => { ... })
})
```

### 3. Integration Tests
Write integration tests for:
- API endpoints
- Database operations
- Service interactions

```typescript
describe('GET /api/{endpoint}', () => {
  it('returns expected data', async () => { ... })
  it('handles invalid input', async () => { ... })
  it('requires authentication', async () => { ... })
})
```

### 4. Component Tests (if frontend)
Write component tests:
- Render tests
- User interaction tests
- State change tests

### 5. E2E Tests (critical paths)
For critical user journeys:
```typescript
test('user can {action}', async ({ page }) => {
  // Navigate
  // Interact
  // Assert
})
```

### 6. Run Tests
Execute test suite:
```bash
npm run test
```

Verify:
- All tests pass
- Coverage meets minimum (80%)
- No flaky tests

## Output
Append to feature document:
```markdown
## Testing

### Test Coverage
- Unit tests: {count} tests
- Integration tests: {count} tests
- E2E tests: {count} tests
- Coverage: {percentage}%

### Test Files
- {test_file_1}
- {test_file_2}
```

Update frontmatter:
```yaml
stepsCompleted: ["step-01", "step-02", "step-03", "step-04", "step-05"]
currentStep: "step-06"
```

## Next Step
→ Proceed to **step-06-review.md** for code review.

## Menu
- [C] Continue to code review
- [R] Run tests again
- [A] Add more tests
- [H] Help
