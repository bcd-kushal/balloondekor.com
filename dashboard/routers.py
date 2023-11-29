# class MongoDBRouter:
#     def db_for_read(self, model, **hints):
#         if model._meta.app_label == 'your_app_name':
#             return 'mongo'
#         return 'default'

#     def db_for_write(self, model, **hints):
#         if model._meta.app_label == 'your_app_name':
#             return 'mongo'
#         return 'default'

#     def allow_relation(self, obj1, obj2, **hints):
#         return None

#     def allow_migrate(self, db, app_label, model_name=None, **hints):
#         return db == 'mongo'
