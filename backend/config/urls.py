from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from content.views import (CategoryViewSet, TagViewSet, PostViewSet, PageViewSet, 
                          ImageViewSet, HomePageViewSet, CategoryPostsView, 
                          TagPostsView, MenuItemViewSet)
from content.admin import my_admin_site

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'images', ImageViewSet, basename='image')
router.register(r'menuitems', MenuItemViewSet, basename='menuitem')

urlpatterns = [
    path('admin/', my_admin_site.urls),
    path('api/', include(router.urls)),
    path('api/<str:lang>/homepage/', HomePageViewSet.as_view({'get': 'list'}), name='homepage-list'),
    path('api/<str:lang>/posts/', PostViewSet.as_view({'get': 'list'}), name='post-list'),
    path('api/<str:lang>/pages/', PageViewSet.as_view({'get': 'list'}), name='page-list'),
    path('api/<str:lang>/post/<str:slug>/', PostViewSet.as_view({'get': 'by_slug'}), name='post-detail'),
    path('api/<str:lang>/page/<str:slug>/', PageViewSet.as_view({'get': 'by_slug'}), name='page-detail'),
    path('api/<str:lang>/categories/<str:slug>/', CategoryPostsView.as_view(), name='category-posts'),
    path('api/<str:lang>/tags/<str:slug>/', TagPostsView.as_view(), name='tag-posts'),
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
