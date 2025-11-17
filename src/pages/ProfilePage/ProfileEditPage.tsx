// frontend/src/pages/ProfilePage/ProfileEditPage.tsx
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Input } from "@/shared/ui/input"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { tokenStorage } from "@/shared/utils/tokenStorage"
import { apiFactory, API_ENDPOINTS } from "@/shared/api"
import type { User } from "@/shared/types"

export const ProfileEditPage = () => {
    const navigate = useNavigate()
    const user = tokenStorage.getUser() // lấy user từ localStorage (hoặc tokenStorage)

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: user?.name ?? "",
            bio: user?.bio ?? "",
        },
    })

    const onSubmit = async (data: { name: string; bio: string; avatar: FileList }) => {
        try {
            // Tạo đối tượng FormData để gửi file
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("bio", data.bio)
            if (data.avatar && data.avatar[0]) {
                formData.append("avatar", data.avatar[0]) // Đính kèm file avatar
            }

            // Gọi API update profile với FormData
            const response = await apiFactory.put(
                `${API_ENDPOINTS.AUTH.PROFILE.replace("{userId}", user?.id ?? "")}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Đảm bảo API chấp nhận dữ liệu kiểu FormData
                    },
                }
            )

            const updatedUser: User = response.data.responseObject

            // Lưu lại user mới vào localStorage
            tokenStorage.setUser(updatedUser)

            // Quay lại trang profile
            navigate("/profile")
        } catch (error) {
            console.error("Failed to update profile:", error)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sửa thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block font-medium">Tên</label>
                            <Input {...register("name")} />
                        </div>
                        <div>
                            <label className="block font-medium">Giới thiệu</label>
                            <Input {...register("bio")} />
                        </div>
                        {/* Thêm trường chọn file cho avatar */}
                        <div>
                            <label className="block font-medium">Ảnh đại diện</label>
                            <input
                                type="file"
                                {...register("avatar")}
                                accept="image/*"
                                onChange={(e) => setValue("avatar", e.target.files)}
                            />
                        </div>
                        <Button type="submit" className="w-full mt-4">
                            Lưu thay đổi
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
