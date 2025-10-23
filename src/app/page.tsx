'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

import RecommendationForm from "@/components/RecommendationForm";
import RecipeCard from "@/components/RecipeCard";

// Define the types for the recipe and form data
interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

interface FormData {
  mealType: string;
  mood: string;
  ingredients: string;
}

export default function Home() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleGetRecommendation = (formData: FormData) => {
    const mockRecipe: Recipe = {
      name: `${formData.mood} ${formData.mealType}을 위한 추천: 김치볶음밥`,
      description: "언제 먹어도 맛있는 한국인의 소울푸드!",
      ingredients: ["김치", "밥", "계란", "대파", formData.ingredients || "참치"].filter(Boolean),
      instructions: [
        "대파를 썰어 기름에 볶아 파기름을 낸다.",
        "김치를 넣고 볶다가, 설탕을 약간 넣어 신맛을 조절한다.",
        "밥을 넣고 고루 섞으며 볶아준다.",
        "계란 후라이를 만들어 밥 위에 올린다.",
        "(선택) 입력한 재료를 함께 볶는다."
      ],
    };
    setRecipe(mockRecipe);
  };

  const handleSaveRecipe = async () => {
    if (!user) {
      toast({ 
        title: "로그인 필요",
        description: "레시피를 저장하려면 로그인이 필요합니다.",
        variant: "destructive",
      });
      router.push("/auth");
      return;
    }
    if (!recipe) return;

    try {
      await addDoc(collection(db, "users", user.uid, "recipes"), {
        ...recipe,
        createdAt: serverTimestamp(),
      });
      toast({ 
        title: "저장 완료",
        description: "레시피가 내 계정에 성공적으로 저장되었습니다.",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({ 
        title: "저장 실패",
        description: "레시피를 저장하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="container mx-auto py-12 space-y-8">
      <RecommendationForm onRecommend={handleGetRecommendation} />
      {recipe && <RecipeCard recipe={recipe} onSave={user ? handleSaveRecipe : undefined} />}
    </main>
  )
}
