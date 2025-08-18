# PR Bot Evaluation Plan

## Objective
Create a systematic evaluation framework to test our PR bot's ability to:
1. Generate relevant tests for code changes
2. Detect introduced bugs
3. Provide appropriate test coverage
4. Handle different types of issues

## Evaluation Categories & Test PRs

### 🔴 Category 1: Critical UI Bugs (Should Catch)

#### PR #1: Broken Authentication Flow
**Change**: Remove password validation in login
```javascript
// Before: app/login/page.tsx
if (!email || !password) return error

// After:
if (!email) return error  // Missing password check
```
**Expected**: Bot should test login with empty password and catch failure
**Severity**: Critical
**Success Criteria**: Test fails, bug caught

#### PR #2: Cart Calculation Error
**Change**: Incorrect total calculation
```javascript
// Before: components/CartView.tsx
total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

// After:
total = items.reduce((sum, item) => sum + item.price, 0)  // Missing quantity
```
**Expected**: Bot should test cart with multiple quantities
**Severity**: Critical
**Success Criteria**: Test detects wrong total

#### PR #3: Missing Navigation Link
**Change**: Break category navigation
```javascript
// Before: app/shop/[category]/page.tsx
<Link href={`/shop/${category}`}>

// After:
<Link href={`/shop/`}>  // Category param lost
```
**Expected**: Bot should test category navigation
**Severity**: High
**Success Criteria**: Test finds broken navigation

### 🟡 Category 2: Logic & State Bugs (Should Catch)

#### PR #4: Filter State Corruption
**Change**: Filters don't reset properly
```javascript
// Before: stores/styleFiltersStore.ts
resetFilters: () => set({ filters: initialFilters })

// After:
resetFilters: () => set({ filters: { ...get().filters } })  // Doesn't actually reset
```
**Expected**: Bot tests filter reset functionality
**Severity**: Medium
**Success Criteria**: Test detects filters not resetting

#### PR #5: Race Condition in Add to Cart
**Change**: Remove async/await in cart operations
```javascript
// Before: 
await addToCart(item)
await updateTotal()

// After:
addToCart(item)  // Missing await
updateTotal()     // Runs before add completes
```
**Expected**: Bot tests rapid cart additions
**Severity**: High
**Success Criteria**: Test finds race condition

### 🟢 Category 3: Visual/CSS Bugs (May Not Catch)

#### PR #6: CSS Layout Break
**Change**: Wrong flexbox property
```css
/* Before: */
display: flex;
justify-content: space-between;

/* After: */
display: flex;
justify-content: invalid-value;  /* Invalid CSS */
```
**Expected**: Bot might not catch pure visual bugs
**Severity**: Low
**Success Criteria**: Document if caught or not

### 🔵 Category 4: API Contract Breaks (Should Catch)

#### PR #7: API Response Format Change
**Change**: Change API response structure
```javascript
// Before: app/api/store/styles/route.ts
return { data: styles, total: count }

// After:
return { styles, count }  // Different structure
```
**Expected**: Bot tests API integration
**Severity**: Critical
**Success Criteria**: Test detects API break

#### PR #8: Missing Error Handling
**Change**: Remove try-catch blocks
```javascript
// Before:
try {
  const result = await fetchStyles()
} catch (error) {
  handleError(error)
}

// After:
const result = await fetchStyles()  // No error handling
```
**Expected**: Bot tests error scenarios
**Severity**: Medium
**Success Criteria**: Test finds unhandled errors

### ⚫ Category 5: Security Issues (Should Catch Some)

#### PR #9: Auth Bypass
**Change**: Comment out auth check
```javascript
// Before: components/AuthGuard.tsx
if (!isAuthenticated) return <Redirect to="/login" />

// After:
// if (!isAuthenticated) return <Redirect to="/login" />  // Auth bypassed
```
**Expected**: Bot tests protected routes
**Severity**: Critical
**Success Criteria**: Test detects unauthorized access

#### PR #10: XSS Vulnerability
**Change**: Use dangerouslySetInnerHTML
```javascript
// Before:
<div>{userInput}</div>

// After:
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```
**Expected**: Bot might test with malicious input
**Severity**: Critical
**Success Criteria**: Document if caught

## Evaluation Metrics

### Primary Metrics
1. **Detection Rate**: % of bugs caught (target: 70%+)
2. **False Positive Rate**: Tests that fail incorrectly (target: <10%)
3. **Coverage**: % of changed code tested (target: 80%+)
4. **Test Quality**: Tests actually test the change (subjective)

### Secondary Metrics
1. **Test Generation Time**: How long to create tests
2. **Test Execution Time**: How long tests take to run
3. **Test Readability**: Are tests understandable?
4. **Bug Description Quality**: Does it explain the issue well?

## Implementation Plan

### Phase 1: Setup (5 PRs)
- Start with obvious bugs (auth, cart)
- Verify pipeline works end-to-end
- Tune prompts if needed

### Phase 2: Expand (5 PRs)
- Add subtle bugs (race conditions, edge cases)
- Test different code areas
- Measure detection rates

### Phase 3: Analysis
- Calculate metrics
- Identify patterns (what it catches/misses)
- Document learnings

## Expected Outcomes

### What Bot Should Catch Well:
- Missing functionality (broken buttons, links)
- Logic errors (wrong calculations)
- API contract violations
- Missing error handling
- Basic auth issues

### What Bot Might Miss:
- Pure visual issues
- Performance problems
- Complex race conditions
- Subtle security vulnerabilities
- UX degradation

## Success Criteria

The evaluation is successful if:
1. Bot catches >70% of critical bugs
2. Bot catches >50% of medium bugs
3. Generated tests are relevant to changes
4. Tests run without infrastructure issues
5. Clear patterns emerge about capabilities

## PR Sequence

1. **Start Simple**: Broken login (most obvious)
2. **Add Complexity**: Cart calculation 
3. **Test Navigation**: Category links
4. **State Management**: Filter reset
5. **Async Issues**: Race conditions
6. **API Changes**: Response format
7. **Error Handling**: Missing try-catch
8. **Security**: Auth bypass
9. **Edge Cases**: XSS, CSS breaks
10. **Combination**: Multiple bugs in one PR

## Tracking Template

For each PR:
```markdown
PR #X: [Title]
Category: [UI/Logic/API/Security/Visual]
Severity: [Critical/High/Medium/Low]
Files Changed: [List]
Bug Description: [What's broken]
Expected Test: [What test should do]
Actual Result: [What happened]
Caught: [Yes/No/Partial]
Test Quality: [1-5]
Notes: [Observations]
```

This creates a rigorous, systematic evaluation of our PR testing capabilities!