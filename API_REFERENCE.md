# API Reference Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

### Authentication Methods
1. **Credentials** - Email & Password
2. **Google OAuth**
3. **GitHub OAuth**

### Get Session
```bash
GET /auth/session

Response:
{
  "user": {
    "id": "...",
    "email": "...",
    "name": "...",
    "image": "...",
    "role": "STUDENT|INSTRUCTOR|ADMIN"
  },
  "expires": "2026-02-13T..."
}
```

---

## Public Endpoints

### 🟢 GET /courses

Get paginated list of published courses with filtering options.

**Query Parameters:**
```
page=1              (optional) - Page number (default: 1)
limit=12            (optional) - Items per page (default: 12)
categoryId=xyz      (optional) - Filter by category
search=query        (optional) - Search in title/description
level=BEGINNER      (optional) - BEGINNER|INTERMEDIATE|ADVANCED
featured=true       (optional) - Only featured courses
sortBy=createdAt    (optional) - Field to sort by (default: createdAt)
order=desc          (optional) - asc|desc (default: desc)
```

**Example Request:**
```bash
curl "http://localhost:3000/api/courses?page=1&limit=12&categoryId=french-basics&search=beginner"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cid1",
      "title": "French Basics for Beginners",
      "slug": "french-basics-for-beginners",
      "description": "...",
      "image": "http://...",
      "rating": 4.8,
      "category": {
        "id": "catid1",
        "name": "French Basics"
      },
      "instructor": {
        "id": "instid1",
        "user": {
          "name": "Michel Dupont",
          "image": "http://..."
        }
      },
      "pricing": {
        "originalPrice": 99.99,
        "discountedPrice": 79.99,
        "discountPercentage": 20,
        "currency": "USD"
      },
      "lessonsCount": 24,
      "status": "PUBLISHED",
      "featured": true,
      "_count": {
        "enrollments": 150,
        "reviews": 45
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "totalCourses": 50,
    "totalPages": 5
  }
}
```

---

### 🟢 GET /courses/:slug

Get detailed information about a single published course.

**Path Parameters:**
```
slug (required) - Course slug (e.g., french-basics-for-beginners)
```

**Example Request:**
```bash
curl "http://localhost:3000/api/courses/french-basics-for-beginners"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cid1",
    "title": "French Basics for Beginners",
    "slug": "french-basics-for-beginners",
    "description": "Complete description...",
    "shortDescription": "Brief description...",
    "image": "http://...",
    "rating": 4.8,
    "level": "BEGINNER",
    "language": "English",
    "duration": 8,
    "lessonsCount": 24,
    "status": "PUBLISHED",
    "featured": true,
    
    "category": {
      "id": "catid1",
      "name": "French Basics",
      "slug": "french-basics"
    },
    
    "instructor": {
      "id": "instid1",
      "firstName": "Michel",
      "lastName": "Dupont",
      "bio": "Native French speaker...",
      "avatar": "http://...",
      "user": {
        "name": "Michel Dupont",
        "image": "http://..."
      }
    },
    
    "pricing": {
      "originalPrice": 99.99,
      "discountedPrice": 79.99,
      "discountPercentage": 20,
      "currency": "USD"
    },
    
    "lessons": [
      {
        "id": "lid1",
        "title": "Lesson 1: French Alphabet",
        "description": "Learn the alphabet...",
        "duration": 25,
        "order": 1
      }
    ],
    
    "reviews": [
      {
        "id": "rid1",
        "rating": 5,
        "title": "Great course!",
        "comment": "...",
        "user": {
          "name": "Jane Doe",
          "image": "http://..."
        }
      }
    ],
    
    "seo": {
      "metaTitle": "French Basics for Beginners...",
      "metaDescription": "Master French fundamentals...",
      "metaKeywords": "french, beginners...",
      "ogImage": "http://..."
    },
    
    "_count": {
      "enrollments": 150,
      "reviews": 45,
      "lessons": 24
    }
  }
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "success": false,
  "error": "Course not found"
}
```

---

### 🟢 GET /categories

Get all course categories.

**Example Request:**
```bash
curl "http://localhost:3000/api/categories"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "catid1",
      "name": "French Basics",
      "slug": "french-basics",
      "description": "Learn French fundamentals...",
      "image": "http://...",
      "_count": {
        "courses": 5
      }
    },
    {
      "id": "catid2",
      "name": "TEF Preparation",
      "slug": "tef-preparation",
      "description": "Prepare for TEF Canada exam...",
      "_count": {
        "courses": 3
      }
    }
  ]
}
```

---

## Admin Endpoints (Requires ADMIN role)

### 🔴 GET /admin/courses

Get all courses (published, draft, and archived) for admin.

**Authentication:** Required (ADMIN)

**Query Parameters:**
```
page=1        (optional) - Page number
limit=10      (optional) - Items per page
status=PUBLISHED (optional) - Filter by status
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cid1",
      "title": "...",
      "slug": "...",
      "status": "PUBLISHED",
      "category": {...},
      "instructor": {...},
      "pricing": {...},
      "_count": {...}
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

---

### 🔴 POST /admin/courses

Create a new course.

**Authentication:** Required (ADMIN)

**Request Body:**
```json
{
  "title": "French Basics for Beginners",
  "slug": "french-basics-for-beginners",
  "description": "Master French fundamentals...",
  "shortDescription": "Learn French from scratch",
  "image": "https://...",
  "categoryId": "catid1",
  "instructorId": "instid1",
  "level": "BEGINNER",
  "language": "English",
  "duration": 8,
  "lessonsCount": 24,
  
  "pricing": {
    "originalPrice": 99.99,
    "discountedPrice": 79.99,
    "discountPercentage": 20,
    "currency": "USD"
  },
  
  "seo": {
    "metaTitle": "French Basics - Learn Online",
    "metaDescription": "Master French fundamentals with our online course",
    "metaKeywords": "french, basics, online course",
    "ogImage": "https://...",
    "ogTitle": "French Basics",
    "ogDescription": "Learn French online"
  }
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/admin/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "French Basics",
    "slug": "french-basics",
    "description": "Learn French",
    "categoryId": "catid1",
    "instructorId": "instid1",
    "pricing": {
      "originalPrice": 99.99
    }
  }'
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "newid",
    "title": "French Basics",
    "slug": "french-basics",
    ...
  }
}
```

**Error Responses:**
```json
// 400 Bad Request
{
  "success": false,
  "error": "Missing required fields"
}

// 400 Conflict
{
  "success": false,
  "error": "Slug already exists"
}
```

---

### 🔴 PUT /admin/courses/:id

Update an existing course.

**Authentication:** Required (ADMIN)

**Path Parameters:**
```
id (required) - Course ID
```

**Request Body:** (all fields optional)
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "pricing": {
    "originalPrice": 129.99,
    "discountedPrice": 99.99
  },
  "status": "PUBLISHED",
  "featured": true
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/admin/courses/cid1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Course Title",
    "status": "PUBLISHED"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "cid1",
    "title": "Updated Course Title",
    ...
  }
}
```

---

### 🔴 DELETE /admin/courses/:id

Delete a course.

**Authentication:** Required (ADMIN)

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/admin/courses/cid1
```

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

**Error Response:**
```json
// 404 Not Found
{
  "success": false,
  "error": "Course not found"
}
```

---

### 🔴 GET /admin/categories

Get all categories (admin view).

**Authentication:** Required (ADMIN)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "catid1",
      "name": "French Basics",
      "slug": "french-basics",
      "description": "...",
      "_count": {
        "courses": 5
      }
    }
  ]
}
```

---

### 🔴 POST /admin/categories

Create a new category.

**Authentication:** Required (ADMIN)

**Request Body:**
```json
{
  "name": "Advanced French",
  "slug": "advanced-french",
  "description": "Advanced French courses",
  "image": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "newcatid",
    "name": "Advanced French",
    "slug": "advanced-french",
    ...
  }
}
```

---

### 🔴 PUT /admin/categories/:id

Update a category.

**Authentication:** Required (ADMIN)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "catid1",
    "name": "Updated Name",
    ...
  }
}
```

---

### 🔴 DELETE /admin/categories/:id

Delete a category (only if no courses).

**Authentication:** Required (ADMIN)

**Error Response (if has courses):**
```json
{
  "success": false,
  "error": "Cannot delete category with existing courses"
}
```

---

## Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Course not found"
}
```

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Failed to fetch courses"
}
```

---

## Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET /courses |
| 201 | Created | POST /admin/courses |
| 400 | Bad Request | Invalid data |
| 401 | Unauthorized | No session |
| 404 | Not Found | Course doesn't exist |
| 500 | Server Error | Database error |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:
- 100 requests per minute per IP for public endpoints
- 10 requests per minute for admin endpoints

---

## Testing with cURL

### Simple GET Request
```bash
curl http://localhost:3000/api/courses
```

### POST with Authentication
```bash
curl -X POST http://localhost:3000/api/admin/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "New Course", ...}'
```

### Pretty Print JSON Response
```bash
curl http://localhost:3000/api/courses | jq
```

---

## WebHooks (Future)

Planned for future implementation:
- Course published event
- Student enrolled event
- Review posted event
- Course status changed

---

**Last Updated:** February 12, 2026  
**API Version:** 1.0.0  
**Maintainers:** Your Team
