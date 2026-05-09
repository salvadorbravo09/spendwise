import SafeAreaView from "@/components/SafeAreaView";
import useSocialAuth from "@/hooks/useSocialAuth";
import { OAUTH } from "@/utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

const SignInScreen = () => {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  const isGoogleClicked = loadingStrategy === OAUTH.GOOGLE_OAUTH;
  const isGithubClicked = loadingStrategy === OAUTH.OAUTH_GITHUB;
  const isAppleClicked = loadingStrategy === OAUTH.OAUTH_APPLE;

  const isLoading = isGoogleClicked || isGithubClicked || isAppleClicked;

  return (
    <SafeAreaView className="bg-magnolia dark:bg-cinder flex-1" edges={["top"]}>
      <View className="px-8 pt-4">
        <Text className="text-center text-5xl font-extrabold tracking-tight text-gun-powder dark:text-athens-gray uppercase font-mono">
          SpendWise
        </Text>

        <Text className="mt-1 text-center text-[14px] text-ebony dark:text-gray-suit">
          Sign in to access your curated financial dashboard
        </Text>

        <View className="flex items-center justify-center mt-12">
          <Image
            source={require("@/assets/images/asd.png")}
            className="w-80 h-80 object-contain"
          />
        </View>
      </View>

      <View className="dark:bg-gray-suit/10 bg-white flex-1 rounded-t-[36px] px-6 pb-8 pt-6 mt-20">
        <View className="self-center rounded-full dark:bg-secondary bg-magnolia/10 px-3 py-1">
          <Text className="text-xs font-semibold uppercase tracking-[1px] dark:text-athens-gray text-gun-powder">
            Welcome Back
          </Text>
        </View>
        <Text className="mt-2 text-center text-sm leading-6 dark:text-white/80 text-gray-500">
          Select a sign-in option below to continue and securely access your
          account.
        </Text>

        <View className="mt-6">
          {/* Google Sign-In */}
          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border dark:border border-gray-300 px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_google")}
          >
            <View className="w-8 h-8 items-center justify-center rounded-full bg-white">
              <Image
                source={require("@/assets/images/google.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold dark:text-white">
              {isGoogleClicked
                ? "Connecting Google..."
                : "Continue with Google"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          {/* GitHub Sign-In */}
          <Pressable
            className={`mb-3 h-14 flex-row items-center rounded-2xl border dark:border border-gray-300 px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_github")}
          >
            <View className="w-8 h-8 items-center justify-center rounded-full bg-white">
              <FontAwesome name="github" size={18} color="#111" />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold dark:text-white">
              {isGithubClicked
                ? "Connecting GitHub..."
                : "Continue with GitHub"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>

          {/* Apple Sign-In */}
          <Pressable
            className={`mb-3 h-14 flex-row items-center dark:bg-white/95 bg-cinder rounded-2xl px-4 active:opacity-90 ${isLoading ? "opacity-70" : ""}`}
            disabled={isLoading}
            onPress={() => handleSocialAuth("oauth_apple")}
          >
            <View className="w-8 h-8 items-center justify-center rounded-full bg-white">
              <FontAwesome name="apple" size={18} color="#111" />
            </View>
            <Text className="ml-3 flex-1 text-lg font-semibold dark:text-black text-white">
              {isAppleClicked
                ? "Connecting Apple......"
                : "Continue with Apple"}
            </Text>
            <FontAwesome name="angle-right" size={18} color="#5f6e66" />
          </Pressable>
        </View>

        <Text className="mt-3 text-center text-sm leading-5 dark:text-white/50 text-gray-500">
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
