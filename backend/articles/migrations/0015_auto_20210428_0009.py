# Generated by Django 3.0 on 2021-04-27 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0014_auto_20210427_2342'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='cover',
            field=models.ImageField(blank=True, default='/no_preview_image.png', null=True, upload_to='covers/'),
        ),
    ]
