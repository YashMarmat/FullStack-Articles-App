# Generated by Django 3.0 on 2021-04-27 09:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_auto_20210425_1325'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='image',
            field=models.ImageField(blank=True, default='no_preview_image.png', null=True, upload_to=''),
        ),
    ]