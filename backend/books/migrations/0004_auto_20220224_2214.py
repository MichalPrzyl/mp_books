# Generated by Django 3.2.2 on 2022-02-24 21:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0003_book_rename_me_later'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='author',
        ),
        migrations.DeleteModel(
            name='Author',
        ),
    ]
