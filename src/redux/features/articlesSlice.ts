import { IArticle } from "@/components/types"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: IArticle[] = []
export const articlesSlice = createSlice({
  name: "articles",
  initialState,

  reducers: {
    addArticles: (state, action: PayloadAction<IArticle>) => {
      state.push(action.payload)
    },

    removeArticles: (state, action: PayloadAction<IArticle>) => {
      return state.filter((article) => {
        return (
          article.url !== action.payload.url &&
          article.title !== action.payload.title &&
          article.description !== action.payload.description
        )
      })
    },
  },
})
export const { addArticles, removeArticles } = articlesSlice.actions
export default articlesSlice.reducer
