from django.core.management.base import BaseCommand, CommandError
from books.models import *

class Command(BaseCommand):
    help = 'Migrate all authors to books model'

    def handle(self, *args, **options):
        books = Book.objects.all()
        counter = 0
        for book in books:
            if book.author:
                counter += 1
                whole_name = book.author.first_name + " " + book.author.last_name
                # print(whole_name)
                book.rename_me_later = whole_name
                book.save()
            # self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % 2))
            self.stdout.write(self.style.SUCCESS(f'Successfully updated {counter} books'))