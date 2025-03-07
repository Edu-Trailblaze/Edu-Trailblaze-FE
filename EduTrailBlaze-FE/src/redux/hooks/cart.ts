import { usePostCartMutation } from '../services/cart.service'
import { addItemToCart } from '../slice/cart.slice'
import { useAppDispatch } from './hooks'

export const useCart = () => {
  const dispatch = useAppDispatch()
  const [postCart] = usePostCartMutation()

  const handleAddToCart = async (userId: string, course: CartItem) => {
    dispatch(addItemToCart(course))
    try {
      await postCart({ userId, courseId: course.cartCourseInformation.id }).unwrap()
      console.log('Course added to cart')
    } catch (error) {
      console.error('Failed to add course to cart', error)
    }
  }
  return { handleAddToCart }
}
