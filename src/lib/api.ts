// API utilities for frontend

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
    cache?: RequestCache;
    revalidateTime?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function apiCall<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
            cache: options.cache || 'default',
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || 'An error occurred',
            };
        }

        return {
            success: true,
            data: data.data || data,
        };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An error occurred',
        };
    }
}

// Course API calls
export const courseApi = {
    async getAllCourses(filters?: {
        page?: number;
        limit?: number;
        categoryId?: string;
        search?: string;
        level?: string;
        featured?: boolean;
        sortBy?: string;
        order?: 'asc' | 'desc';
    }) {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined) {
                    params.append(key, String(value));
                }
            });
        }
        return apiCall('/api/courses?' + params.toString());
    },

    async getCourseBySlug(slug: string) {
        return apiCall(`/api/courses/${slug}`);
    },

    async searchCourses(query: string) {
        return apiCall(`/api/courses?search=${encodeURIComponent(query)}`);
    },
};

// Category API calls
export const categoryApi = {
    async getAllCategories() {
        return apiCall('/api/categories');
    },
};

// Admin API calls
export const adminApi = {
    async getCourses(page = 1, limit = 10, status?: string) {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (status) params.append('status', status);
        return apiCall(`/api/admin/courses?${params.toString()}`);
    },

    async createCourse(courseData: any) {
        return apiCall('/api/admin/courses', {
            method: 'POST',
            body: courseData,
        });
    },

    async updateCourse(courseId: string, courseData: any) {
        return apiCall(`/api/admin/courses/${courseId}`, {
            method: 'PUT',
            body: courseData,
        });
    },

    async deleteCourse(courseId: string) {
        return apiCall(`/api/admin/courses/${courseId}`, {
            method: 'DELETE',
        });
    },

    async getCategories() {
        return apiCall('/api/admin/categories');
    },

    async createCategory(categoryData: any) {
        return apiCall('/api/admin/categories', {
            method: 'POST',
            body: categoryData,
        });
    },

    async updateCategory(categoryId: string, categoryData: any) {
        return apiCall(`/api/admin/categories/${categoryId}`, {
            method: 'PUT',
            body: categoryData,
        });
    },

    async deleteCategory(categoryId: string) {
        return apiCall(`/api/admin/categories/${categoryId}`, {
            method: 'DELETE',
        });
    },
};
