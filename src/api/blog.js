import axios from '@/libs/api.request'
export const createBlog = ({ title, content, groupId, media }) => {
    return axios.request({
        url: '/api/blog/create_blog_list',
        params: {
            title,
            content,
            groupId,
            media
        },
        method: 'post'
    });
};

export const readBlogList = ({ limit, offset, keyword }) => {
    return axios.request({
        url: '/api/blog/read_blog_list',
        params: {
            limit,
            offset,
            isSuper: 1,
            keyword
        },
        method: 'get'
    });
};

export const readBlogById = (id) => {
    return axios.request({
        url: '/api/blog/read_blog_by_id',
        method: 'post',
        params: {
            id
        }
    });
};

export const updateBlogById = (id) => {
    return axios.request({
        url: '/api/blog/update_blog_by_id',
        method: 'post',
        params: {
            id
        }
    });
};

export const deleteBlogById = (id) => {
    return axios.request({
        url: '/api/blog/delete_blog_by_id',
        method: 'post',
        params: {
            id
        }
    });
};
