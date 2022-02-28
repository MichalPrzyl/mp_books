from django.shortcuts import render
from rest_framework import generics, mixins
from books.serializers import BookSerializer
from books.models import Book
from rest_framework.response import Response
# Create your views here.


class BookGenericAPI(generics.GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin, mixins.DestroyModelMixin):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


    def get(self, request):
        return Response(self.list(request).data)

    def post(self, request):
        return Response({'data' : self.create(request).data})

    def delete(self, request, pk):
        if pk:
            return Response({
                'data' : self.destroy(request, pk).data
            })
