'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface FormData {
  mealType: string;
  mood: string;
  ingredients: string;
}

interface RecommendationFormProps {
  onRecommend: (formData: FormData) => void;
}

export default function RecommendationForm({ onRecommend }: RecommendationFormProps) {
  const [mealType, setMealType] = useState("lunch");
  const [mood, setMood] = useState("simple");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecommend({ mealType, mood, ingredients });
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>오늘 뭐 먹지?</CardTitle>
        <CardDescription>원하는 메뉴의 조건을 선택해주세요.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="meal-type">식사 종류</Label>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger id="meal-type">
                <SelectValue placeholder="식사 종류를 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lunch">점심</SelectItem>
                <SelectItem value="dinner">저녁</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>오늘의 기분</Label>
            <ToggleGroup type="single" value={mood} onValueChange={(value) => value && setMood(value)} className="justify-start">
              <ToggleGroupItem value="heavy">든든하게 💪</ToggleGroupItem>
              <ToggleGroupItem value="simple">초간단하게 ⚡</ToggleGroupItem>
              <ToggleGroupItem value="stress">스트레스 해소 🥵</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredients">가지고 있는 재료</Label>
            <Input 
              id="ingredients" 
              placeholder="예: 계란, 양파, 밥" 
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">메뉴 추천받기</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
