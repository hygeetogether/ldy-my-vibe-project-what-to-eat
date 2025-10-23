'use client'

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Recipe {
  id: string;
  name: string;
  memo?: string;
}

interface EditRecipeDialogProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (recipeId: string, newMemo: string) => void;
}

export default function EditRecipeDialog({ recipe, isOpen, onOpenChange, onSave }: EditRecipeDialogProps) {
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (recipe) {
      setMemo(recipe.memo || "");
    }
  }, [recipe]);

  const handleSave = () => {
    if (recipe) {
      onSave(recipe.id, memo);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>메모 수정: {recipe?.name}</DialogTitle>
          <DialogDescription>
            이 레시피에 대한 개인적인 메모를 추가하거나 수정하세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="memo">메모</Label>
            <Textarea 
              id="memo" 
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="예: 다음엔 설탕을 반만 넣기"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>저장하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
