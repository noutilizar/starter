# Generated by Django 2.2.13 on 2021-03-04 16:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20210304_1534'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tarea',
            old_name='descripcon',
            new_name='descripcion',
        ),
    ]
