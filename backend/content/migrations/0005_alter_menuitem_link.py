# Generated by Django 4.2.4 on 2023-09-20 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0004_alter_menuitem_newtab'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menuitem',
            name='link',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
