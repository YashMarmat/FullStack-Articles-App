# Generated by Django 3.0 on 2021-04-25 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_auto_20210421_2048'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='createdAt',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
