# Arch Linux Hyprland 安裝指南
> 基於 [binnewbs/arch-hyprland](https://github.com/binnewbs/arch-hyprland) 配置的完整安裝指南

## 📋 前置需求
- 已安裝 Arch Linux 系統
- 已配置基本的 pacman 和 AUR helper (如 yay 或 paru)
- 具備基本的終端操作能力

## 🎯 安裝順序

### 第一階段：核心系統組件

#### 1. 安裝 Hyprland 窗口管理器
```bash
# 主要 Hyprland 套件
sudo pacman -S hyprland hyprlock hypridle hyprpicker hyprpaper

# 或者從 AUR 安裝最新版本
yay -S hyprland-git
```

#### 2. 基礎系統工具
```bash
# 系統必需組件
sudo pacman -S polkit polkit-kde-agent
sudo pacman -S xdg-desktop-portal-hyprland xdg-desktop-portal-gtk
sudo pacman -S qt5-wayland qt6-wayland
```

#### 3. 音頻系統
```bash
# 音頻服務器和控制
sudo pacman -S pipewire pipewire-pulse pipewire-alsa
sudo pacman -S pamixer pavucontrol
```

### 第二階段：終端和基礎應用

#### 4. 終端模擬器
```bash
# Kitty 終端 (配置中指定的預設終端)
sudo pacman -S kitty
```

#### 5. Shell 環境
```bash
# Zsh (配置包含 .zshrc)
sudo pacman -S zsh zsh-completions
# 可選：安裝 Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 第三階段：UI 組件和工具

#### 6. 狀態列 - Waybar
```bash
sudo pacman -S waybar
# 或 AUR 版本支持更多功能
yay -S waybar-git
```

#### 7. 應用啟動器 - Rofi
```bash
sudo pacman -S rofi-wayland
# 或
yay -S rofi-lbonn-wayland-git
```

#### 8. 通知系統 - SwayNC
```bash
# 從 AUR 安裝
yay -S swaync
```

#### 9. 登出選單 - Wlogout
```bash
yay -S wlogout
```

### 第四階段：主題和視覺效果

#### 10. 壁紙管理 - SWWW
```bash
yay -S swww
```

#### 11. 色彩主題生成器 - Matugen
```bash
yay -S matugen-bin
```

#### 12. 系統信息顯示 - Fastfetch
```bash
sudo pacman -S fastfetch
```

#### 13. 音頻視覺化 - Cava
```bash
sudo pacman -S cava
```

### 第五階段：網路和藍牙

#### 14. 網路管理
```bash
sudo pacman -S networkmanager network-manager-applet
sudo systemctl enable NetworkManager
```

#### 15. 藍牙支援
```bash
sudo pacman -S bluez bluez-utils blueman
sudo systemctl enable bluetooth
```

### 第六階段：系統工具和便利功能

#### 16. 螢幕截圖工具
```bash
sudo pacman -S grim slurp wl-clipboard
```

#### 17. 亮度控制
```bash
sudo pacman -S brightnessctl
```

#### 18. 檔案管理器
```bash
sudo pacman -S nautilus
```

#### 19. 字體安裝
```bash
# 基本字體
sudo pacman -S ttf-dejavu ttf-liberation noto-fonts noto-fonts-cjk noto-fonts-emoji
# Nerd Fonts (用於圖標)
yay -S nerd-fonts-complete
```

### 第七階段：可選增強功能

#### 20. 遊戲和性能
```bash
# 如果需要遊戲支援
sudo pacman -S gamemode
```

#### 21. 開發工具 (可選)
```bash
sudo pacman -S git vim neovim
```

## 🔧 配置文件安裝

### 1. 克隆配置文件
```bash
# 克隆 binnewbs 的配置
git clone https://github.com/binnewbs/arch-hyprland.git ~/hypr-config

# 備份現有配置 (如果有)
mkdir -p ~/.config-backup
cp -r ~/.config/hypr ~/.config-backup/ 2>/dev/null || true
cp -r ~/.config/waybar ~/.config-backup/ 2>/dev/null || true
cp -r ~/.config/swaync ~/.config-backup/ 2>/dev/null || true
cp -r ~/.config/rofi ~/.config-backup/ 2>/dev/null || true
```

### 2. 複製配置文件到正確位置

#### SwayNC 配置放置位置
```bash
# SwayNC 配置應該放在 ~/.config/swaync/
mkdir -p ~/.config/swaync
cp -r ~/hypr-config/.config/swaync/* ~/.config/swaync/

# 注意：不要使用 "swaync 0.12" 目錄，除非你特別需要舊版本配置
```

#### 其他配置文件
```bash
# Hyprland 配置
mkdir -p ~/.config/hypr
cp -r ~/hypr-config/.config/hypr/* ~/.config/hypr/

# Waybar 配置
mkdir -p ~/.config/waybar
cp -r ~/hypr-config/.config/waybar/* ~/.config/waybar/

# Rofi 配置
mkdir -p ~/.config/rofi
cp -r ~/hypr-config/.config/rofi/* ~/.config/rofi/

# Kitty 配置
mkdir -p ~/.config/kitty
cp -r ~/hypr-config/.config/kitty/* ~/.config/kitty/

# 其他配置
mkdir -p ~/.config/cava ~/.config/fastfetch ~/.config/matugen ~/.config/wlogout
cp -r ~/hypr-config/.config/cava/* ~/.config/cava/
cp -r ~/hypr-config/.config/fastfetch/* ~/.config/fastfetch/
cp -r ~/hypr-config/.config/matugen/* ~/.config/matugen/
cp -r ~/hypr-config/.config/wlogout/* ~/.config/wlogout/

# Zsh 配置
cp ~/hypr-config/.zshrc ~/.zshrc
```

### 3. 設置腳本權限
```bash
chmod +x ~/.config/hypr/scripts/*.sh
```

### 4. 壁紙安裝
```bash
mkdir -p ~/Pictures/Wallpapers
cp -r ~/hypr-config/wallpapers/* ~/Pictures/Wallpapers/
```

## 🚀 啟動和測試

### 1. 服務啟動
```bash
# 確保必要服務已啟動
sudo systemctl enable NetworkManager bluetooth
systemctl --user enable pipewire pipewire-pulse
```

### 2. 登出到 Display Manager
```bash
# 如果使用 SDDM
sudo pacman -S sddm
sudo systemctl enable sddm

# 如果使用 GDM
sudo pacman -S gdm
sudo systemctl enable gdm
```

### 3. 選擇 Hyprland 會話並登入

### 4. 測試功能
- 按 `Super + Q` 開啟終端
- 按 `Super + R` 開啟 Rofi 應用啟動器
- 按 `Super + L` 鎖定螢幕
- 按 `Super + M` 打開登出選單

## ⚠️ 重要注意事項

### ROG 筆電特定設定
1. **ASUS ROG 鍵盤燈光控制**：
   ```bash
   yay -S rog-control-center
   sudo systemctl enable --now asusd
   ```

2. **風扇控制**：
   ```bash
   yay -S asusctl
   ```

3. **NVIDIA 顯卡支援** (如果適用)：
   ```bash
   sudo pacman -S nvidia nvidia-utils nvidia-settings
   # 在 Hyprland 配置中添加：
   env = LIBVA_DRIVER_NAME,nvidia
   env = XDG_SESSION_TYPE,wayland
   env = GBM_BACKEND,nvidia-drm
   env = __GLX_VENDOR_LIBRARY_NAME,nvidia
   env = WLR_NO_HARDWARE_CURSORS,1
   ```

### 故障排除
1. **如果 Waybar 沒有顯示**：
   ```bash
   killall waybar
   waybar &
   ```

2. **如果通知不工作**：
   ```bash
   killall swaync
   swaync &
   ```

3. **如果壁紙沒有載入**：
   ```bash
   swww init
   swww img ~/Pictures/Wallpapers/your-wallpaper.jpg
   ```

## 🎨 個人化設定

### 修改配色方案
1. 使用 Matugen 生成新的配色：
   ```bash
   matugen image ~/Pictures/Wallpapers/your-wallpaper.jpg
   ```

2. 配色文件會自動更新在：
   - `~/.config/hypr/colors.conf`
   - `~/.config/waybar/colors.css`
   - `~/.config/rofi/colors.rasi`

### 自定義快捷鍵
編輯 `~/.config/hypr/configs/keybinds.conf` 來修改按鍵綁定。

### 工作區配置
修改 `~/.config/hypr/configs/windowrules.conf` 來設定視窗規則。

## 📦 完整套件清單

### Pacman 套件
```bash
hyprland hyprlock hypridle hyprpicker hyprpaper polkit polkit-kde-agent xdg-desktop-portal-hyprland xdg-desktop-portal-gtk qt5-wayland qt6-wayland pipewire pipewire-pulse pipewire-alsa pamixer pavucontrol kitty zsh zsh-completions waybar rofi-wayland networkmanager network-manager-applet bluez bluez-utils blueman grim slurp wl-clipboard brightnessctl nautilus ttf-dejavu ttf-liberation noto-fonts noto-fonts-cjk noto-fonts-emoji gamemode git vim neovim fastfetch cava
```

### AUR 套件
```bash
yay -S swaync wlogout swww matugen-bin nerd-fonts-complete rog-control-center asusctl
```

## 🔄 更新和維護

### 定期更新
```bash
# 更新系統套件
sudo pacman -Syu

# 更新 AUR 套件
yay -Sua

# 更新配置文件 (可選)
cd ~/hypr-config && git pull
```

### 配置備份
```bash
# 建立配置備份腳本
#!/bin/bash
tar -czf ~/hypr-config-backup-$(date +%Y%m%d).tar.gz ~/.config/hypr ~/.config/waybar ~/.config/swaync ~/.config/rofi ~/.config/kitty
```

---

**🎉 安裝完成後，你將擁有一個現代化、美觀且功能完整的 Hyprland 桌面環境！**

享受你的新 Wayland 桌面體驗！ 🚀