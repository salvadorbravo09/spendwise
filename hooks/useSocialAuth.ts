import { useSSO } from "@clerk/expo";
import { useState } from "react";
import { Alert } from "react-native";

const useSocialAuth = () => {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (
    strategy: "oauth_google" | "oauth_github" | "oauth_apple",
  ) => {
    if (loadingStrategy) return; // Prevent multiple clicks
    setLoadingStrategy(strategy); // Set the loading state to the current strategy

    console.log("Starting strategy:", strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Authentication Failed",
          "Unable to complete social authentication. Please try again.",
        );
        return;
      }

      await setActive({ session: createdSessionId });
    } catch (error) {
      console.log("Error during social auth:", error);
      Alert.alert(
        "Error",
        "An error occurred during social authentication. Please try again.",
      );
    } finally {
      setLoadingStrategy(null); // Reset the loading state after the process is complete
    }
  };

  return { loadingStrategy, handleSocialAuth };
};

export default useSocialAuth;
