---
name: frontend-patterns
description: Frontend development patterns for React, Vue, Svelte, Angular.
user-invocable: true
---

# Frontend Patterns

Check `config/stack.yaml` for your active frontend framework.

## Universal Patterns

### Component Composition
Break complex UI into smaller, reusable components.

### State Management Tiers
1. **Local state**: Component-level (useState, ref, signal)
2. **Shared state**: Cross-component (Context, Pinia, Svelte stores)
3. **Server state**: API data (TanStack Query, SWR, useFetch)

### Data Fetching Pattern
```
// Pseudo-code pattern
function DataComponent() {
  const { data, loading, error } = useFetch('/api/data')
  
  if (loading) return <Loading />
  if (error) return <Error />
  return <Display data={data} />
}
```

### Custom Hook/Composable Pattern
Extract reusable logic into hooks/composables:
- `useDebounce` - Debounce values
- `useLocalStorage` - Persist state
- `useMediaQuery` - Responsive logic

## Framework-Specific

### React
```tsx
// Composition
function Card({ children }: { children: React.ReactNode }) {
  return <div className="card">{children}</div>
}

// Hooks
const [state, setState] = useState(initial)
const memoized = useMemo(() => compute(dep), [dep])
```

### Vue 3
```vue
<script setup lang="ts">
// Composition API
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

### Svelte 5
```svelte
<script lang="ts">
// Runes
let count = $state(0)
let doubled = $derived(count * 2)
</script>
```

### Angular
```typescript
// Signals
count = signal(0)
doubled = computed(() => this.count() * 2)
```

## Performance Checklist

- [ ] Lazy load heavy components
- [ ] Memoize expensive computations
- [ ] Virtualize long lists
- [ ] Optimize images
- [ ] Use proper loading states

## Anti-Patterns

- Prop drilling (use state management)
- Business logic in components (extract to utils)
- Direct DOM manipulation
- Inline styles (use CSS classes)
