# Generated by Django 3.2.2 on 2022-02-24 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0002_author_book_pages_book_publication_year_book_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='rename_me_later',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]
