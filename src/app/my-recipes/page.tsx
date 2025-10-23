'use client'

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase/config';
import { collection, query, onSnapshot, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import RecipeCard from '@/components/RecipeCard';
import { useToast } from "@/hooks/use-toast";
import EditRecipeDialog from '@/components/EditRecipeDialog';

// Firestore 문서의 데이터 타입을 정의합니다.
interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  memo?: string;
}

export default function MyRecipesPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, `users/${user.uid}/recipes`),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const recipesData: Recipe[] = [];
        querySnapshot.forEach((doc) => {
          recipesData.push({ id: doc.id, ...doc.data() } as Recipe);
        });
        setRecipes(recipesData);
        setLoading(false);
      }, (error) => {
        console.error("Error fetching recipes: ", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleDeleteRecipe = async (recipeId: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, `users/${user.uid}/recipes`, recipeId));
      toast({ title: "삭제 완료", description: "레시피가 삭제되었습니다." });
    } catch (error) {
      console.error("Error deleting recipe: ", error);
      toast({ title: "삭제 실패", description: "레시피 삭제 중 오류가 발생했습니다.", variant: "destructive" });
    }
  };

  const handleOpenEditDialog = (recipe: Recipe) => {
    setEditingRecipe(recipe);
  };

  const handleUpdateRecipe = async (recipeId: string, newMemo: string) => {
    if (!user) return;
    try {
      const recipeRef = doc(db, `users/${user.uid}/recipes`, recipeId);
      await updateDoc(recipeRef, { memo: newMemo });
      setEditingRecipe(null);
      toast({ title: "수정 완료", description: "메모가 성공적으로 저장되었습니다." });
    } catch (error) {
      console.error("Error updating recipe: ", error);
      toast({ title: "수정 실패", description: "메모 저장 중 오류가 발생했습니다.", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="container mx-auto py-12 text-center">로딩 중...</div>;
  }

  if (!user) {
    return <div className="container mx-auto py-12 text-center">레시피를 보려면 로그인이 필요합니다.</div>;
  }

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">내 레시피 목록</h1>
      {recipes.length === 0 ? (
        <div className="text-center">저장된 레시피가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onEdit={() => handleOpenEditDialog(recipe)}
              onDelete={() => handleDeleteRecipe(recipe.id)}
            />
          ))}
        </div>
      )}
      {editingRecipe && (
        <EditRecipeDialog
          recipe={editingRecipe}
          isOpen={!!editingRecipe}
          onOpenChange={() => setEditingRecipe(null)}
          onSave={handleUpdateRecipe}
        />
      )}
    </main>
  );
}
