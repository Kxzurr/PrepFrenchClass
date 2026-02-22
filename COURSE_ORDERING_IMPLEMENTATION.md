# Course Ordering Feature - Implementation Guide

## Overview
A complete admin-controlled course ordering system has been implemented. Admins can now reorder courses through the admin panel, and these courses will be displayed in the custom order on the frontend by default.

## What Was Implemented

### 1. Database Schema Changes
- **Field Added**: `displayOrder` (nullable Int) to the `Course` model in `prisma/schema.prisma`
- **Migration Created**: `prisma/migrations/20260222000002_add_display_order_to_course/migration.sql`
- **Why nullable**: Backward compatibility - existing courses without an order value will fall back to date-based sorting

### 2. Admin Panel Features

#### New Ordering Page
- **Location**: `/admin/courses/order`
- **URL**: http://localhost:3000/admin/courses/order
- **Features**:
  - Display all courses in a list with position numbers
  - **Drag-and-drop** reordering
  - **Up/Down arrow buttons** for precise positioning
  - **Save** and **Cancel** buttons
  - Changes are saved to the database immediately upon save
  - Visual feedback for unsaved changes

#### Navigation Update
- A new **"Reorder Courses"** button has been added to the main courses list page
- Located next to the "+ New Course" button

### 3. API Endpoints

#### New Endpoint: Bulk Course Reorder
```
POST /api/admin/courses/bulk/reorder
```
**Request Body**:
```json
{
  "orders": [
    { "id": "course-id-1", "displayOrder": 1 },
    { "id": "course-id-2", "displayOrder": 2 },
    { "id": "course-id-3", "displayOrder": 3 }
  ]
}
```

#### Updated Endpoints
- **PUT `/api/admin/courses/:id`**: Now accepts `displayOrder` field
- **GET `/api/admin/courses`**: New optional parameter `sortByOrder=true` to fetch courses in custom order

### 4. Frontend Course Display

#### Default Sorting Logic
The `/api/courses` endpoint now implements intelligent sorting:

1. **Featured Courses** (`featured=true`): Uses `createdAt DESC` (newest first)
2. **Custom Sort** (`sortBy` parameter specified): Uses the specified field
3. **Default** (no parameters): Uses `displayOrder ASC` with fallback to `createdAt DESC` for unordered courses

#### Stable Sorting
- Courses with `displayOrder` are sorted first
- Courses without `displayOrder` (NULL values) are sorted by creation date
- This ensures existing courses automatically appear at the end, maintaining predictability

#### Updated Components
- **GridView**: Removed hardcoded `sortBy=createdAt` to use default ordering
- **ListView**: Removed hardcoded `sortBy=createdAt` to use default ordering
- **Featured courses section**: Continues to use `featured=true` filter (unaffected)

### 5. Admin API Methods
Added to `/src/lib/api.ts`:
```typescript
async reorderCourses(orders: Array<{ id: string; displayOrder: number }>) {
  return apiCall('/api/admin/courses/bulk/reorder', {
    method: 'POST',
    body: { orders },
  });
}
```

## How to Use

### For Admins

#### Step 1: Access Ordering Page
Navigate to `/admin/courses` and click the **"Reorder Courses"** button

#### Step 2: Reorder Courses
- **Option A - Drag & Drop**: Click and drag courses to reorder them
- **Option B - Arrow Buttons**: Use ↑ and ↓ buttons next to each course
- The position numbers (#1, #2, etc.) update in real-time

#### Step 3: Save Changes
- Click **"Save Order"** button to persist changes to the database
- The button only appears when there are unsaved changes
- Upon successful save, the page refreshes to show the updated order

#### Step 4: Verify Frontend Display
- Courses on the homepage and all course listing pages now display in the custom order
- Featured courses still show based on the "featured" flag

### For Developers

#### Running Migrations
```bash
npx prisma migrate deploy
```

#### Checking Course Order in Database
```prisma
// Query with order
const courses = await prisma.course.findMany({
  orderBy: [
    { displayOrder: 'asc' },
    { createdAt: 'desc' }
  ]
});
```

#### API Usage Examples

**Fetch courses in custom order**:
```javascript
fetch('/api/courses')  // Uses default displayOrder sorting
```

**Fetch featured courses** (uses createdAt):
```javascript
fetch('/api/courses?featured=true')
```

**Fetch admin courses in custom order**:
```javascript
fetch('/api/admin/courses?sortByOrder=true')
```

**Update individual course order**:
```javascript
fetch('/api/admin/courses/:id', {
  method: 'PUT',
  body: JSON.stringify({
    displayOrder: 5  // Set course as position 5
  })
})
```

## File Changes Summary

### Created Files
1. `/src/app/admin/courses/order/page.tsx` - Admin ordering UI
2. `/src/app/api/admin/courses/bulk/reorder/route.ts` - Bulk reorder endpoint
3. `/prisma/migrations/20260222000002_add_display_order_to_course/migration.sql` - Database migration

### Modified Files
1. `/prisma/schema.prisma` - Added `displayOrder` field to Course model
2. `/src/app/admin/courses/page.tsx` - Added link to ordering page
3. `/src/app/api/admin/courses/route.ts` - Added `sortByOrder` parameter
4. `/src/app/api/admin/courses/[id]/route.ts` - Added `displayOrder` to update payload
5. `/src/app/api/courses/route.ts` - Updated default sorting logic
6. `/src/components/Courses/GridView/index.tsx` - Removed hardcoded sortBy
7. `/src/components/Courses/ListView/index.tsx` - Removed hardcoded sortBy
8. `/src/lib/api.ts` - Added `reorderCourses` method

## Testing Checklist

- [ ] Run `npx prisma migrate deploy` to apply the migration
- [ ] Visit `/admin/courses` and verify "Reorder Courses" button appears
- [ ] Click "Reorder Courses" and verify the ordering page loads
- [ ] Drag a course to a new position and verify numbers update
- [ ] Click "Save Order" and verify success message
- [ ] Visit homepage and verify courses display in the new order
- [ ] Go back to ordering page and verify order is persisted
- [ ] Add a featured flag to a course and verify it still shows with featured=true filter
- [ ] Create a new course and verify it appears at the end (shows with unordered courses)

## Notes

1. **Backward Compatibility**: Existing courses without a `displayOrder` value will continue to work and will appear after ordered courses
2. **Performance**: The sorting uses Prisma's native orderBy with multiple fields for efficiency
3. **Featured Courses**: Not affected by this feature - they continue to use their own sorting logic
4. **Auto-numbering**: The UI automatically assigns position numbers (1, 2, 3...) based on the order in the list

## Troubleshooting

### Courses not appearing in custom order
- Verify the migration has been run: `npx prisma migrate status`
- Check the `displayOrder` field in the database

### Ordering page not loading
- Clear browser cache
- Check browser console for errors
- Verify user has ADMIN role

### Save button not appearing
- Ensure you've made changes (drag or click up/down)
- Changes are tracked when items are reordered
