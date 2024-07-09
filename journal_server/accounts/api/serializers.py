
from dj_rest_auth.registration.serializers import RegisterSerializer as DjRestAuthRegisterSerializer
from allauth.account.adapter import get_adapter


class CustomRegistrationSerializer(DjRestAuthRegisterSerializer):
    def get_cleaned_data(self):
        super().get_cleaned_data()
        return {
            "username": self.validated_data.get("username", ""),
            "password1": self.validated_data.get("password1", ""),
            "password2": self.validated_data.get("password2", ""),
            "email": self.validated_data.get("email", ""),
            
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.save()
        adapter.save_user(request, user, self)
        return user