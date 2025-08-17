# 1 "find_lon.c"
# 1 "<built-in>" 1
# 1 "<built-in>" 3
# 427 "<built-in>" 3
# 1 "<command line>" 1
# 1 "<built-in>" 2
# 1 "find_lon.c" 2
# 15 "find_lon.c"
# 1 "/data/data/com.termux/files/usr/include/stdio.h" 1 3 4
# 41 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/sys/cdefs.h" 1 3 4
# 335 "/data/data/com.termux/files/usr/include/sys/cdefs.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/android/versioning.h" 1 3 4
# 336 "/data/data/com.termux/files/usr/include/sys/cdefs.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/android/api-level.h" 1 3 4
# 194 "/data/data/com.termux/files/usr/include/android/api-level.h" 3 4
int android_get_application_target_sdk_version() __attribute__((__availability__(android,strict,introduced=24 )));







# 1 "/data/data/com.termux/files/usr/include/bits/get_device_api_level_inlines.h" 1 3 4
# 38 "/data/data/com.termux/files/usr/include/bits/get_device_api_level_inlines.h" 3 4
int __system_property_get(const char* _Nonnull __name, char* _Nonnull __value);
int atoi(const char* _Nonnull __s) __attribute__((__pure__));

static __inline__ int android_get_device_api_level() {
  char value[92] = { 0 };
  if (__system_property_get("ro.build.version.sdk", value) < 1) return -1;
  int api_level = atoi(value);
  return (api_level > 0) ? api_level : -1;
}
# 203 "/data/data/com.termux/files/usr/include/android/api-level.h" 2 3 4
# 337 "/data/data/com.termux/files/usr/include/sys/cdefs.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/android/ndk-version.h" 1 3 4
# 339 "/data/data/com.termux/files/usr/include/sys/cdefs.h" 2 3 4
# 42 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/sys/types.h" 1 3 4
# 32 "/data/data/com.termux/files/usr/include/sys/types.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 84 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_header_macro.h" 1 3 4
# 85 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4



# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 18 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 3 4
typedef long int ptrdiff_t;
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 18 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 3 4
typedef long unsigned int size_t;
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 24 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 3 4
typedef unsigned int wchar_t;
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_null.h" 1 3 4
# 109 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 123 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_max_align_t.h" 1 3 4
# 19 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_max_align_t.h" 3 4
typedef struct {
  long long __clang_max_align_nonce1
      __attribute__((__aligned__(__alignof__(long long))));
  long double __clang_max_align_nonce2
      __attribute__((__aligned__(__alignof__(long double))));
} max_align_t;
# 124 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 33 "/data/data/com.termux/files/usr/include/sys/types.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stdint.h" 1 3 4
# 56 "/data/data/com.termux/files/usr/lib/clang/20/include/stdint.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/stdint.h" 1 3 4
# 32 "/data/data/com.termux/files/usr/include/stdint.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/wchar_limits.h" 1 3 4
# 33 "/data/data/com.termux/files/usr/include/stdint.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 34 "/data/data/com.termux/files/usr/include/stdint.h" 2 3 4


typedef signed char __int8_t;
typedef unsigned char __uint8_t;
typedef short __int16_t;
typedef unsigned short __uint16_t;
typedef int __int32_t;
typedef unsigned int __uint32_t;

typedef long __int64_t;
typedef unsigned long __uint64_t;






typedef long __intptr_t;
typedef unsigned long __uintptr_t;





typedef __int8_t int8_t;
typedef __uint8_t uint8_t;

typedef __int16_t int16_t;
typedef __uint16_t uint16_t;

typedef __int32_t int32_t;
typedef __uint32_t uint32_t;

typedef __int64_t int64_t;
typedef __uint64_t uint64_t;

typedef __intptr_t intptr_t;
typedef __uintptr_t uintptr_t;

typedef int8_t int_least8_t;
typedef uint8_t uint_least8_t;

typedef int16_t int_least16_t;
typedef uint16_t uint_least16_t;

typedef int32_t int_least32_t;
typedef uint32_t uint_least32_t;

typedef int64_t int_least64_t;
typedef uint64_t uint_least64_t;

typedef int8_t int_fast8_t;
typedef uint8_t uint_fast8_t;

typedef int64_t int_fast64_t;
typedef uint64_t uint_fast64_t;


typedef int64_t int_fast16_t;
typedef uint64_t uint_fast16_t;
typedef int64_t int_fast32_t;
typedef uint64_t uint_fast32_t;







typedef uint64_t uintmax_t;
typedef int64_t intmax_t;
# 57 "/data/data/com.termux/files/usr/lib/clang/20/include/stdint.h" 2 3 4
# 34 "/data/data/com.termux/files/usr/include/sys/types.h" 2 3 4


# 1 "/data/data/com.termux/files/usr/include/linux/types.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/types.h" 1 3 4






# 1 "/data/data/com.termux/files/usr/include/asm-generic/types.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/asm-generic/int-ll64.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/bitsperlong.h" 1 3 4
# 10 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/bitsperlong.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/asm-generic/bitsperlong.h" 1 3 4
# 11 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/bitsperlong.h" 2 3 4
# 10 "/data/data/com.termux/files/usr/include/asm-generic/int-ll64.h" 2 3 4

typedef __signed__ char __s8;
typedef unsigned char __u8;
typedef __signed__ short __s16;
typedef unsigned short __u16;
typedef __signed__ int __s32;
typedef unsigned int __u32;

__extension__ typedef __signed__ long long __s64;
__extension__ typedef unsigned long long __u64;
# 10 "/data/data/com.termux/files/usr/include/asm-generic/types.h" 2 3 4
# 8 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/types.h" 2 3 4
# 10 "/data/data/com.termux/files/usr/include/linux/types.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/linux/posix_types.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/linux/stddef.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/linux/compiler_types.h" 1 3 4
# 11 "/data/data/com.termux/files/usr/include/linux/compiler_types.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/linux/compiler.h" 1 3 4
# 12 "/data/data/com.termux/files/usr/include/linux/compiler_types.h" 2 3 4
# 10 "/data/data/com.termux/files/usr/include/linux/stddef.h" 2 3 4
# 10 "/data/data/com.termux/files/usr/include/linux/posix_types.h" 2 3 4


typedef struct {
  unsigned long fds_bits[1024 / (8 * sizeof(long))];
} __kernel_fd_set;
typedef void(* __kernel_sighandler_t) (int);
typedef int __kernel_key_t;
typedef int __kernel_mqd_t;
# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/posix_types.h" 1 3 4








typedef unsigned short __kernel_old_uid_t;
typedef unsigned short __kernel_old_gid_t;

# 1 "/data/data/com.termux/files/usr/include/asm-generic/posix_types.h" 1 3 4
# 11 "/data/data/com.termux/files/usr/include/asm-generic/posix_types.h" 3 4
typedef long __kernel_long_t;
typedef unsigned long __kernel_ulong_t;


typedef __kernel_ulong_t __kernel_ino_t;


typedef unsigned int __kernel_mode_t;


typedef int __kernel_pid_t;


typedef int __kernel_ipc_pid_t;


typedef unsigned int __kernel_uid_t;
typedef unsigned int __kernel_gid_t;


typedef __kernel_long_t __kernel_suseconds_t;


typedef int __kernel_daddr_t;


typedef unsigned int __kernel_uid32_t;
typedef unsigned int __kernel_gid32_t;






typedef unsigned int __kernel_old_dev_t;







typedef __kernel_ulong_t __kernel_size_t;
typedef __kernel_long_t __kernel_ssize_t;
typedef __kernel_long_t __kernel_ptrdiff_t;



typedef struct {
  int val[2];
} __kernel_fsid_t;

typedef __kernel_long_t __kernel_off_t;
typedef long long __kernel_loff_t;
typedef __kernel_long_t __kernel_old_time_t;
typedef __kernel_long_t __kernel_time_t;
typedef long long __kernel_time64_t;
typedef __kernel_long_t __kernel_clock_t;
typedef int __kernel_timer_t;
typedef int __kernel_clockid_t;
typedef char * __kernel_caddr_t;
typedef unsigned short __kernel_uid16_t;
typedef unsigned short __kernel_gid16_t;
# 13 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/posix_types.h" 2 3 4
# 19 "/data/data/com.termux/files/usr/include/linux/posix_types.h" 2 3 4
# 12 "/data/data/com.termux/files/usr/include/linux/types.h" 2 3 4

typedef __signed__ __int128 __s128 __attribute__((aligned(16)));
typedef unsigned __int128 __u128 __attribute__((aligned(16)));



typedef __u16 __le16;
typedef __u16 __be16;
typedef __u32 __le32;
typedef __u32 __be32;
typedef __u64 __le64;
typedef __u64 __be64;
typedef __u16 __sum16;
typedef __u32 __wsum;



typedef unsigned __poll_t;
# 37 "/data/data/com.termux/files/usr/include/sys/types.h" 2 3 4


# 1 "/data/data/com.termux/files/usr/include/bits/pthread_types.h" 1 3 4
# 32 "/data/data/com.termux/files/usr/include/bits/pthread_types.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/sys/types.h" 1 3 4
# 33 "/data/data/com.termux/files/usr/include/bits/pthread_types.h" 2 3 4

typedef struct {
  uint32_t flags;
  void* stack_base;
  size_t stack_size;
  size_t guard_size;
  int32_t sched_policy;
  int32_t sched_priority;

  char __reserved[16];

} pthread_attr_t;


typedef struct {

  int64_t __private[4];



} pthread_barrier_t;



typedef int pthread_barrierattr_t;


typedef struct {

  int32_t __private[12];



} pthread_cond_t;

typedef long pthread_condattr_t;

typedef int pthread_key_t;

typedef struct {

  int32_t __private[10];



} pthread_mutex_t;

typedef long pthread_mutexattr_t;

typedef int pthread_once_t;

typedef struct {

  int32_t __private[14];



} pthread_rwlock_t;

typedef long pthread_rwlockattr_t;


typedef struct {

  int64_t __private;



} pthread_spinlock_t;


typedef long pthread_t;
# 40 "/data/data/com.termux/files/usr/include/sys/types.h" 2 3 4


typedef __kernel_gid32_t __gid_t;
typedef __gid_t gid_t;
typedef __kernel_uid32_t __uid_t;
typedef __uid_t uid_t;
typedef __kernel_pid_t __pid_t;
typedef __pid_t pid_t;
typedef uint32_t __id_t;
typedef __id_t id_t;

typedef unsigned long blkcnt_t;
typedef unsigned long blksize_t;
typedef __kernel_caddr_t caddr_t;
typedef __kernel_clock_t clock_t;

typedef __kernel_clockid_t __clockid_t;
typedef __clockid_t clockid_t;

typedef __kernel_daddr_t daddr_t;
typedef unsigned long fsblkcnt_t;
typedef unsigned long fsfilcnt_t;

typedef __kernel_mode_t __mode_t;
typedef __mode_t mode_t;

typedef __kernel_key_t __key_t;
typedef __key_t key_t;

typedef __kernel_ino_t __ino_t;
typedef __ino_t ino_t;

typedef uint64_t ino64_t;

typedef uint32_t __nlink_t;
typedef __nlink_t nlink_t;

typedef void* __timer_t;
typedef __timer_t timer_t;

typedef __kernel_suseconds_t __suseconds_t;
typedef __suseconds_t suseconds_t;


typedef uint32_t __useconds_t;
typedef __useconds_t useconds_t;





typedef uint64_t dev_t;



typedef __kernel_time_t __time_t;
typedef __time_t time_t;




typedef int64_t off_t;
typedef off_t loff_t;
typedef loff_t off64_t;
# 115 "/data/data/com.termux/files/usr/include/sys/types.h" 3 4
typedef uint32_t __socklen_t;

typedef __socklen_t socklen_t;

typedef __builtin_va_list __va_list;
# 128 "/data/data/com.termux/files/usr/include/sys/types.h" 3 4
typedef __kernel_ssize_t ssize_t;


typedef unsigned int uint_t;
typedef unsigned int uint;


typedef unsigned char u_char;
typedef unsigned short u_short;
typedef unsigned int u_int;
typedef unsigned long u_long;

typedef uint32_t u_int32_t;
typedef uint16_t u_int16_t;
typedef uint8_t u_int8_t;
typedef uint64_t u_int64_t;
# 43 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 1 3 4
# 47 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg_header_macro.h" 1 3 4
# 48 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 2 3 4



# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg___gnuc_va_list.h" 1 3 4
# 12 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg___gnuc_va_list.h" 3 4
typedef __builtin_va_list __gnuc_va_list;
# 52 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg_va_list.h" 1 3 4
# 12 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg_va_list.h" 3 4
typedef __builtin_va_list va_list;
# 57 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg_va_arg.h" 1 3 4
# 62 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg___va_copy.h" 1 3 4
# 67 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stdarg_va_copy.h" 1 3 4
# 72 "/data/data/com.termux/files/usr/lib/clang/20/include/stdarg.h" 2 3 4
# 45 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 46 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4


# 1 "/data/data/com.termux/files/usr/include/string.h" 1 3 4
# 33 "/data/data/com.termux/files/usr/include/string.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 34 "/data/data/com.termux/files/usr/include/string.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/xlocale.h" 1 3 4
# 44 "/data/data/com.termux/files/usr/include/xlocale.h" 3 4
struct __locale_t;




typedef struct __locale_t* locale_t;
# 35 "/data/data/com.termux/files/usr/include/string.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/bits/strcasecmp.h" 1 3 4
# 49 "/data/data/com.termux/files/usr/include/bits/strcasecmp.h" 3 4
int strcasecmp(const char* _Nonnull __s1, const char* _Nonnull __s2) __attribute__((__pure__));






int strcasecmp_l(const char* _Nonnull __s1, const char* _Nonnull __s2, locale_t _Nonnull __l) __attribute__((__pure__)) __attribute__((__availability__(android,strict,introduced=23 )));
# 68 "/data/data/com.termux/files/usr/include/bits/strcasecmp.h" 3 4
int strncasecmp(const char* _Nonnull __s1, const char* _Nonnull __s2, size_t __n) __attribute__((__pure__));






int strncasecmp_l(const char* _Nonnull __s1, const char* _Nonnull __s2, size_t __n, locale_t _Nonnull __l) __attribute__((__pure__)) __attribute__((__availability__(android,strict,introduced=23 )));
# 37 "/data/data/com.termux/files/usr/include/string.h" 2 3 4







void* _Nullable memccpy(void* _Nonnull __dst, const void* _Nonnull __src, int __stop_char, size_t __n);
void* _Nullable memchr(const void* _Nonnull __s, int __ch, size_t __n) __attribute__((__pure__));




void* _Nullable memrchr(const void* _Nonnull __s, int __ch, size_t __n) __attribute__((__pure__));

int memcmp(const void* _Nonnull __lhs, const void* _Nonnull __rhs, size_t __n) __attribute__((__pure__));
void* _Nonnull memcpy(void* _Nonnull, const void* _Nonnull, size_t);







void* _Nonnull memmove(void* _Nonnull __dst, const void* _Nonnull __src, size_t __n);







void* _Nonnull memset(void* _Nonnull __dst, int __ch, size_t __n);
# 84 "/data/data/com.termux/files/usr/include/string.h" 3 4
void* _Nullable memmem(const void* _Nonnull __haystack, size_t __haystack_size, const void* _Nonnull __needle, size_t __needle_size) __attribute__((__pure__));

char* _Nullable strchr(const char* _Nonnull __s, int __ch) __attribute__((__pure__));
char* _Nullable __strchr_chk(const char* _Nonnull __s, int __ch, size_t __n);
# 105 "/data/data/com.termux/files/usr/include/string.h" 3 4
char* _Nullable strrchr(const char* _Nonnull __s, int __ch) __attribute__((__pure__));
char* _Nullable __strrchr_chk(const char* _Nonnull __s, int __ch, size_t __n);

size_t strlen(const char* _Nonnull __s) __attribute__((__pure__));
size_t __strlen_chk(const char* _Nonnull __s, size_t __n);

int strcmp(const char* _Nonnull __lhs, const char* _Nonnull __rhs) __attribute__((__pure__));
char* _Nonnull stpcpy(char* _Nonnull __dst, const char* _Nonnull __src);
char* _Nonnull strcpy(char* _Nonnull __dst, const char* _Nonnull __src);
char* _Nonnull strcat(char* _Nonnull __dst, const char* _Nonnull __src);
char* _Nullable strdup(const char* _Nonnull __s);

char* _Nullable strstr(const char* _Nonnull __haystack, const char* _Nonnull __needle) __attribute__((__pure__));




char* _Nullable strcasestr(const char* _Nonnull __haystack, const char* _Nonnull __needle) __attribute__((__pure__));

char* _Nullable strtok(char* _Nullable __s, const char* _Nonnull __delimiter);
char* _Nullable strtok_r(char* _Nullable __s, const char* _Nonnull __delimiter, char* _Nonnull * _Nonnull __pos_ptr);

char* _Nonnull strerror(int __errno_value);


char* _Nonnull strerror_l(int __errno_value, locale_t _Nonnull __l) __attribute__((__availability__(android,strict,introduced=23 )));





int strerror_r(int __errno_value, char* _Nonnull __buf, size_t __n);
# 170 "/data/data/com.termux/files/usr/include/string.h" 3 4
size_t strnlen(const char* _Nonnull __s, size_t __n) __attribute__((__pure__));
char* _Nonnull strncat(char* _Nonnull __dst, const char* _Nonnull __src, size_t __n);
char* _Nullable strndup(const char* _Nonnull __s, size_t __n);
int strncmp(const char* _Nonnull __lhs, const char* _Nonnull __rhs, size_t __n) __attribute__((__pure__));
char* _Nonnull stpncpy(char* _Nonnull __dst, const char* _Nonnull __src, size_t __n);
char* _Nonnull strncpy(char* _Nonnull __dst, const char* _Nonnull __src, size_t __n);

size_t strlcat(char* _Nonnull __dst, const char* _Nonnull __src, size_t __n);
size_t strlcpy(char* _Nonnull __dst, const char* _Nonnull __src, size_t __n);

size_t strcspn(const char* _Nonnull __s, const char* _Nonnull __reject) __attribute__((__pure__));
char* _Nullable strpbrk(const char* _Nonnull __s, const char* _Nonnull __accept) __attribute__((__pure__));
char* _Nullable strsep(char* _Nullable * _Nonnull __s_ptr, const char* _Nonnull __delimiter);
size_t strspn(const char* _Nonnull __s, const char* _Nonnull __accept);

char* _Nonnull strsignal(int __signal);

int strcoll(const char* _Nonnull __lhs, const char* _Nonnull __rhs) __attribute__((__pure__));
size_t strxfrm(char* _Null_unspecified __dst, const char* _Nonnull __src, size_t __n);

int strcoll_l(const char* _Nonnull __lhs, const char* _Nonnull __rhs, locale_t _Nonnull __l) __attribute__((__pure__));
size_t strxfrm_l(char* _Null_unspecified __dst, const char* _Nonnull __src, size_t __n, locale_t _Nonnull __l);
# 49 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/fcntl.h" 1 3 4
# 13 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/fcntl.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/asm-generic/fcntl.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/bits/flock64.h" 1 3 4
# 10 "/data/data/com.termux/files/usr/include/asm-generic/fcntl.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/flock.h" 1 3 4
# 60 "/data/data/com.termux/files/usr/include/bits/flock.h" 3 4
struct flock { short l_type; short l_whence; off64_t l_start; off64_t l_len; pid_t l_pid; };
struct flock64 { short l_type; short l_whence; off64_t l_start; off64_t l_len; pid_t l_pid; };
# 11 "/data/data/com.termux/files/usr/include/asm-generic/fcntl.h" 2 3 4
# 110 "/data/data/com.termux/files/usr/include/asm-generic/fcntl.h" 3 4
struct f_owner_ex {
  int type;
  __kernel_pid_t pid;
};
# 14 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/fcntl.h" 2 3 4
# 51 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/bits/seek_constants.h" 1 3 4
# 53 "/data/data/com.termux/files/usr/include/stdio.h" 2 3 4







typedef off_t fpos_t;
typedef off64_t fpos64_t;

struct __sFILE;
typedef struct __sFILE FILE;


extern FILE* _Nonnull stdin __attribute__((__availability__(android,strict,introduced=23 )));
extern FILE* _Nonnull stdout __attribute__((__availability__(android,strict,introduced=23 )));
extern FILE* _Nonnull stderr __attribute__((__availability__(android,strict,introduced=23 )));
# 111 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
void clearerr(FILE* _Nonnull __fp);
int fclose(FILE* _Nonnull __fp);
int feof(FILE* _Nonnull __fp);
int ferror(FILE* _Nonnull __fp);
int fflush(FILE* _Nullable __fp);
int fgetc(FILE* _Nonnull __fp);
char* _Nullable fgets(char* _Nonnull __buf, int __size, FILE* _Nonnull __fp);
int fprintf(FILE* _Nonnull __fp , const char* _Nonnull __fmt, ...) __attribute__((__format__(printf, 2, 3)));
int fputc(int __ch, FILE* _Nonnull __fp);
int fputs(const char* _Nonnull __s, FILE* _Nonnull __fp);
size_t fread(void* _Nonnull __buf, size_t __size, size_t __count, FILE* _Nonnull __fp);
int fscanf(FILE* _Nonnull __fp, const char* _Nonnull __fmt, ...) __attribute__((__format__(scanf, 2, 3)));
size_t fwrite(const void* _Nonnull __buf, size_t __size, size_t __count, FILE* _Nonnull __fp);
int getc(FILE* _Nonnull __fp);
int getchar(void);
ssize_t getdelim(char* _Nullable * _Nonnull __line_ptr, size_t* _Nonnull __line_length_ptr, int __delimiter, FILE* _Nonnull __fp);
ssize_t getline(char* _Nullable * _Nonnull __line_ptr, size_t* _Nonnull __line_length_ptr, FILE* _Nonnull __fp);

void perror(const char* _Nullable __msg);
int printf(const char* _Nonnull __fmt, ...) __attribute__((__format__(printf, 1, 2)));
int putc(int __ch, FILE* _Nonnull __fp);
int putchar(int __ch);
int puts(const char* _Nonnull __s);
int remove(const char* _Nonnull __path);
void rewind(FILE* _Nonnull __fp);
int scanf(const char* _Nonnull __fmt, ...) __attribute__((__format__(scanf, 1, 2)));
void setbuf(FILE* _Nonnull __fp, char* _Nullable __buf);
int setvbuf(FILE* _Nonnull __fp, char* _Nullable __buf, int __mode, size_t __size);
int sscanf(const char* _Nonnull __s, const char* _Nonnull __fmt, ...) __attribute__((__format__(scanf, 2, 3)));
int ungetc(int __ch, FILE* _Nonnull __fp);
int vfprintf(FILE* _Nonnull __fp, const char* _Nonnull __fmt, va_list __args) __attribute__((__format__(printf, 2, 0)));
int vprintf(const char* _Nonnull __fp, va_list __args) __attribute__((__format__(printf, 1, 0)));

int dprintf(int __fd, const char* _Nonnull __fmt, ...) __attribute__((__format__(printf, 2, 3)));
int vdprintf(int __fd, const char* _Nonnull __fmt, va_list __args) __attribute__((__format__(printf, 2, 0)));





int sprintf(char* _Null_unspecified __s, const char* _Nonnull __fmt, ...)
    __attribute__((__format__(printf, 2, 3))) ;
int vsprintf(char* _Null_unspecified __s, const char* _Nonnull __fmt, va_list __args)
    __attribute__((__format__(printf, 2, 0))) ;
char* _Nullable tmpnam(char* _Nullable __s)
    __attribute__((__deprecated__("tmpnam is unsafe, use mkstemp or tmpfile instead")));

char* _Nullable tempnam(const char* _Nullable __dir, const char* _Nullable __prefix)
    __attribute__((__deprecated__("tempnam is unsafe, use mkstemp or tmpfile instead")));







int rename(const char* _Nonnull __old_path, const char* _Nonnull __new_path);







int renameat(int __old_dir_fd, const char* _Nonnull __old_path, int __new_dir_fd, const char* _Nonnull __new_path);
# 212 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
int fseek(FILE* _Nonnull __fp, long __offset, int __whence);
long ftell(FILE* _Nonnull __fp);
# 238 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
int fgetpos(FILE* _Nonnull __fp, fpos_t* _Nonnull __pos);
int fsetpos(FILE* _Nonnull __fp, const fpos_t* _Nonnull __pos);
int fseeko(FILE* _Nonnull __fp, off_t __offset, int __whence);
off_t ftello(FILE* _Nonnull __fp);
# 253 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
int fgetpos64(FILE* _Nonnull __fp, fpos64_t* _Nonnull __pos) __attribute__((__availability__(android,strict,introduced=24 )));
int fsetpos64(FILE* _Nonnull __fp, const fpos64_t* _Nonnull __pos) __attribute__((__availability__(android,strict,introduced=24 )));
int fseeko64(FILE* _Nonnull __fp, off64_t __offset, int __whence) __attribute__((__availability__(android,strict,introduced=24 )));
off64_t ftello64(FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=24 )));
# 272 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
FILE* _Nullable fopen(const char* _Nonnull __path, const char* _Nonnull __mode);


FILE* _Nullable fopen64(const char* _Nonnull __path, const char* _Nonnull __mode) __attribute__((__availability__(android,strict,introduced=24 )));


FILE* _Nullable freopen(const char* _Nullable __path, const char* _Nonnull __mode, FILE* _Nonnull __fp);


FILE* _Nullable freopen64(const char* _Nullable __path, const char* _Nonnull __mode, FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=24 )));



FILE* _Nullable tmpfile64(void) __attribute__((__availability__(android,strict,introduced=24 )));



int snprintf(char* _Null_unspecified __buf, size_t __size, const char* _Nonnull __fmt, ...) __attribute__((__format__(printf, 3, 4)));
int vfscanf(FILE* _Nonnull __fp, const char* _Nonnull __fmt, va_list __args) __attribute__((__format__(scanf, 2, 0)));
int vscanf(const char* _Nonnull __fmt , va_list __args) __attribute__((__format__(scanf, 1, 0)));
int vsnprintf(char* _Null_unspecified __buf, size_t __size, const char* _Nonnull __fmt, va_list __args) __attribute__((__format__(printf, 3, 0)));
int vsscanf(const char* _Nonnull __s, const char* _Nonnull __fmt, va_list __args) __attribute__((__format__(scanf, 2, 0)));
# 302 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
static __inline__ char* _Nonnull ctermid(char* _Nullable s) {
 if (s == 0) return (char*) "/dev/tty";
 strcpy(s, "/dev/tty");
 return s;
}


FILE* _Nullable fdopen(int __fd, const char* _Nonnull __mode);
int fileno(FILE* _Nonnull __fp);
int pclose(FILE* _Nonnull __fp);
FILE* _Nullable popen(const char* _Nonnull __command, const char* _Nonnull __mode);
void flockfile(FILE* _Nonnull __fp);
int ftrylockfile(FILE* _Nonnull __fp);
void funlockfile(FILE* _Nonnull __fp);
int getc_unlocked(FILE* _Nonnull __fp);
int getchar_unlocked(void);
int putc_unlocked(int __ch, FILE* _Nonnull __fp);
int putchar_unlocked(int __ch);



FILE* _Nullable fmemopen(void* _Nullable __buf, size_t __size, const char* _Nonnull __mode) __attribute__((__availability__(android,strict,introduced=23 )));
FILE* _Nullable open_memstream(char* _Nonnull * _Nonnull __ptr, size_t* _Nonnull __size_ptr) __attribute__((__availability__(android,strict,introduced=23 )));




int asprintf(char* _Nullable * _Nonnull __s_ptr, const char* _Nonnull __fmt, ...) __attribute__((__format__(printf, 2, 3)));
char* _Nullable fgetln(FILE* _Nonnull __fp, size_t* _Nonnull __length_ptr);
int fpurge(FILE* _Nonnull __fp);
void setbuffer(FILE* _Nonnull __fp, char* _Nullable __buf, int __size);
int setlinebuf(FILE* _Nonnull __fp);
int vasprintf(char* _Nullable * _Nonnull __s_ptr, const char* _Nonnull __fmt, va_list __args) __attribute__((__format__(printf, 2, 0)));


void clearerr_unlocked(FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=23 )));
int feof_unlocked(FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=23 )));
int ferror_unlocked(FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=23 )));




int fileno_unlocked(FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=24 )));
# 376 "/data/data/com.termux/files/usr/include/stdio.h" 3 4
int open(const char*, int, ...);
extern pid_t getpid();
extern int unlink(const char*);
void free(void* p);
uint32_t arc4random(void);
static __inline__ FILE* _Nullable tmpfile() {
 int p = getpid();
 char* path;
 int i;
 for (i = 0; i < 100; i++) {
  unsigned int r = arc4random();
  if (asprintf(&path, "/data/data/com.termux/files/usr/tmp/tmpfile.%d-%u", p, r) == -1) return ((void*)0);
  int fd = open(path, 00000002 | 00000100 | 00000200 | 0400000, 0600);
  if (fd >= 0) {
   FILE* result = fdopen(fd, "w+");
   unlink(path);
   free(path);
   return result;
  }
  free(path);
 }
 return ((void*)0);
}
# 16 "find_lon.c" 2
# 1 "/data/data/com.termux/files/usr/include/stdlib.h" 1 3 4
# 32 "/data/data/com.termux/files/usr/include/stdlib.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/alloca.h" 1 3 4
# 33 "/data/data/com.termux/files/usr/include/stdlib.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/wait.h" 1 3 4
# 38 "/data/data/com.termux/files/usr/include/bits/wait.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/linux/wait.h" 1 3 4
# 39 "/data/data/com.termux/files/usr/include/bits/wait.h" 2 3 4
# 34 "/data/data/com.termux/files/usr/include/stdlib.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/malloc.h" 1 3 4
# 29 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 30 "/data/data/com.termux/files/usr/include/malloc.h" 2 3 4
# 58 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
void* _Nullable malloc(size_t __byte_count) __attribute__((__malloc__)) __attribute__((__alloc_size__(1))) __attribute__((__warn_unused_result__));
# 67 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
void* _Nullable calloc(size_t __item_count, size_t __item_size) __attribute__((__malloc__)) __attribute__((__alloc_size__(1,2))) __attribute__((__warn_unused_result__));
# 77 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
void* _Nullable realloc(void* _Nullable __ptr, size_t __byte_count) __attribute__((__alloc_size__(2))) __attribute__((__warn_unused_result__));
# 100 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
void free(void* _Nullable __ptr);
# 111 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
void* _Nullable memalign(size_t __alignment, size_t __byte_count) __attribute__((__malloc__)) __attribute__((__alloc_size__(2))) __attribute__((__warn_unused_result__));





size_t malloc_usable_size(const void* _Nullable __ptr);
# 143 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
struct mallinfo { size_t arena; size_t ordblks; size_t smblks; size_t hblks; size_t hblkhd; size_t usmblks; size_t fsmblks; size_t uordblks; size_t fordblks; size_t keepcost; };







struct mallinfo mallinfo(void);




struct mallinfo2 { size_t arena; size_t ordblks; size_t smblks; size_t hblks; size_t hblkhd; size_t usmblks; size_t fsmblks; size_t uordblks; size_t fordblks; size_t keepcost; };






struct mallinfo2 mallinfo2(void) __asm__("mallinfo");
# 192 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
int malloc_info(int __must_be_zero, FILE* _Nonnull __fp) __attribute__((__availability__(android,strict,introduced=23 )));
# 321 "/data/data/com.termux/files/usr/include/malloc.h" 3 4
enum HeapTaggingLevel {




  M_HEAP_TAGGING_LEVEL_NONE = 0,






  M_HEAP_TAGGING_LEVEL_TBI = 1,





  M_HEAP_TAGGING_LEVEL_ASYNC = 2,





  M_HEAP_TAGGING_LEVEL_SYNC = 3,

};
# 35 "/data/data/com.termux/files/usr/include/stdlib.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 36 "/data/data/com.termux/files/usr/include/stdlib.h" 2 3 4
# 47 "/data/data/com.termux/files/usr/include/stdlib.h" 3 4
__attribute__((__noreturn__)) void abort(void) __attribute__((__nomerge__));
__attribute__((__noreturn__)) void exit(int __status);
__attribute__((__noreturn__)) void _Exit(int __status);

int atexit(void (* _Nonnull __fn)(void));

int at_quick_exit(void (* _Nonnull __fn)(void));
void quick_exit(int __status) __attribute__((__noreturn__));

char* _Nullable getenv(const char* _Nonnull __name);
int putenv(char* _Nonnull __assignment);
int setenv(const char* _Nonnull __name, const char* _Nonnull __value, int __overwrite);
int unsetenv(const char* _Nonnull __name);
int clearenv(void);

char* _Nullable mkdtemp(char* _Nonnull __template);
char* _Nullable mktemp(char* _Nonnull __template) __attribute__((__deprecated__("mktemp is unsafe, use mkstemp or tmpfile instead")));



int mkostemp64(char* _Nonnull __template, int __flags) __attribute__((__availability__(android,strict,introduced=23 )));
int mkostemp(char* _Nonnull __template, int __flags) __attribute__((__availability__(android,strict,introduced=23 )));
int mkostemps64(char* _Nonnull __template, int __suffix_length, int __flags) __attribute__((__availability__(android,strict,introduced=23 )));
int mkostemps(char* _Nonnull __template, int __suffix_length, int __flags) __attribute__((__availability__(android,strict,introduced=23 )));


int mkstemp64(char* _Nonnull __template);
int mkstemp(char* _Nonnull __template);


int mkstemps64(char* _Nonnull __template, int __flags) __attribute__((__availability__(android,strict,introduced=23 )));


int mkstemps(char* _Nonnull __template, int __flags);

long strtol(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base);
long long strtoll(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base);
unsigned long strtoul(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base);
unsigned long long strtoull(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base);

int posix_memalign(void* _Nullable * _Nullable __memptr, size_t __alignment, size_t __size);







double strtod(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr);
long double strtold(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr);







int atoi(const char* _Nonnull __s) __attribute__((__pure__));
long atol(const char* _Nonnull __s) __attribute__((__pure__));
long long atoll(const char* _Nonnull __s) __attribute__((__pure__));

__attribute__((__warn_unused_result__)) char* _Nullable realpath(const char* _Nonnull __path, char* _Nullable __resolved);
# 125 "/data/data/com.termux/files/usr/include/stdlib.h" 3 4
int system(const char* _Nonnull __command);

void* _Nullable bsearch(const void* _Nonnull __key, const void* _Nullable __base, size_t __nmemb, size_t __size, int (* _Nonnull __comparator)(const void* _Nonnull __lhs, const void* _Nonnull __rhs));

void qsort(void* _Nullable __base, size_t __nmemb, size_t __size, int (* _Nonnull __comparator)(const void* _Nullable __lhs, const void* _Nullable __rhs));

uint32_t arc4random(void);
uint32_t arc4random_uniform(uint32_t __upper_bound);
void arc4random_buf(void* _Nonnull __buf, size_t __n);



int rand_r(unsigned int* _Nonnull __seed_ptr);

double drand48(void);
double erand48(unsigned short __xsubi[_Nonnull 3]);
long jrand48(unsigned short __xsubi[_Nonnull 3]);


void lcong48(unsigned short __param[_Nonnull 7]) __attribute__((__availability__(android,strict,introduced=23 )));


long lrand48(void);
long mrand48(void);
long nrand48(unsigned short __xsubi[_Nonnull 3]);
unsigned short* _Nonnull seed48(unsigned short __seed16v[_Nonnull 3]);
void srand48(long __seed);

char* _Nullable initstate(unsigned int __seed, char* _Nonnull __state, size_t __n);
char* _Nullable setstate(char* _Nonnull __state);

int getpt(void);
int posix_openpt(int __flags);
char* _Nullable ptsname(int __fd);
int ptsname_r(int __fd, char* _Nonnull __buf, size_t __n);
int unlockpt(int __fd);







typedef struct {
  int quot;
  int rem;
} div_t;

div_t div(int __numerator, int __denominator) __attribute__((__const__));

typedef struct {
  long int quot;
  long int rem;
} ldiv_t;

ldiv_t ldiv(long __numerator, long __denominator) __attribute__((__const__));

typedef struct {
  long long int quot;
  long long int rem;
} lldiv_t;

lldiv_t lldiv(long long __numerator, long long __denominator) __attribute__((__const__));
# 203 "/data/data/com.termux/files/usr/include/stdlib.h" 3 4
const char* _Nullable getprogname(void);
void setprogname(const char* _Nonnull __name);

int mblen(const char* _Nullable __s, size_t __n) ;
size_t mbstowcs(wchar_t* _Nullable __dst, const char* _Nullable __src, size_t __n);
int mbtowc(wchar_t* _Nullable __wc_ptr, const char* _Nullable __s, size_t __n);
int wctomb(char* _Nullable __dst, wchar_t __wc);

size_t wcstombs(char* _Nullable __dst, const wchar_t* _Nullable __src, size_t __n);







int abs(int __x) __attribute__((__const__));
long labs(long __x) __attribute__((__const__));
long long llabs(long long __x) __attribute__((__const__));

float strtof(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr);
double atof(const char* _Nonnull __s) __attribute__((__pure__));
int rand(void);
void srand(unsigned int __seed);
long random(void);
void srandom(unsigned int __seed);
int grantpt(int __fd);

long long strtoll_l(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base, locale_t _Nonnull __l);
unsigned long long strtoull_l(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base, locale_t _Nonnull __l);
long double strtold_l(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, locale_t _Nonnull __l);
# 245 "/data/data/com.termux/files/usr/include/stdlib.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/android/legacy_stdlib_inlines.h" 1 3 4
# 36 "/data/data/com.termux/files/usr/include/android/legacy_stdlib_inlines.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/stdlib.h" 1 3 4
# 37 "/data/data/com.termux/files/usr/include/android/legacy_stdlib_inlines.h" 2 3 4




static __inline__ double strtod_l(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, locale_t _Nonnull __l) {
  return strtod(__s, __end_ptr);
}

static __inline__ float strtof_l(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, locale_t _Nonnull __l) {
  return strtof(__s, __end_ptr);
}

static __inline__ long strtol_l(const char* _Nonnull __s, char* _Nullable * _Nullable __end_ptr, int __base, locale_t _Nonnull __l) {
  return strtol(__s, __end_ptr, __base);
}
# 246 "/data/data/com.termux/files/usr/include/stdlib.h" 2 3 4
# 17 "find_lon.c" 2
# 1 "/data/data/com.termux/files/usr/include/math.h" 1 3 4
# 19 "/data/data/com.termux/files/usr/include/math.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/limits.h" 1 3 4
# 25 "/data/data/com.termux/files/usr/lib/clang/20/include/limits.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/limits.h" 1 3 4
# 41 "/data/data/com.termux/files/usr/include/limits.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/float.h" 1 3 4
# 42 "/data/data/com.termux/files/usr/include/limits.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/linux/limits.h" 1 3 4
# 44 "/data/data/com.termux/files/usr/include/limits.h" 2 3 4
# 143 "/data/data/com.termux/files/usr/include/limits.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/posix_limits.h" 1 3 4
# 144 "/data/data/com.termux/files/usr/include/limits.h" 2 3 4
# 26 "/data/data/com.termux/files/usr/lib/clang/20/include/limits.h" 2 3 4
# 20 "/data/data/com.termux/files/usr/include/math.h" 2 3 4





typedef double __double_t;
typedef __double_t double_t;
typedef float __float_t;
typedef __float_t float_t;
# 76 "/data/data/com.termux/files/usr/include/math.h" 3 4
double acos(double __x);
float acosf(float __x);
long double acosl(long double __x);

double asin(double __x);
float asinf(float __x);
long double asinl(long double __x);

double atan(double __x);
float atanf(float __x);
long double atanl(long double __x);

double atan2(double __y, double __x);
float atan2f(float __y, float __x);
long double atan2l(long double __y, long double __x);

double cos(double __x);
float cosf(float __x);
long double cosl(long double __x);

double sin(double __x);
float sinf(float __x);
long double sinl(long double __x);

double tan(double __x);
float tanf(float __x);
long double tanl(long double __x);

double acosh(double __x);
float acoshf(float __x);
long double acoshl(long double __x);

double asinh(double __x);
float asinhf(float __x);
long double asinhl(long double __x);

double atanh(double __x);
float atanhf(float __x);
long double atanhl(long double __x);

double cosh(double __x);
float coshf(float __x);
long double coshl(long double __x);

double sinh(double __x);
float sinhf(float __x);
long double sinhl(long double __x);

double tanh(double __x);
float tanhf(float __x);
long double tanhl(long double __x);

double exp(double __x);
float expf(float __x);
long double expl(long double __x);

double exp2(double __x);
float exp2f(float __x);
long double exp2l(long double __x);

double expm1(double __x);
float expm1f(float __x);
long double expm1l(long double __x);

double frexp(double __x, int* _Nonnull __exponent);
float frexpf(float __x, int* _Nonnull __exponent);
long double frexpl(long double __x, int* _Nonnull __exponent);

int ilogb(double __x) __attribute__((__const__));
int ilogbf(float __x) __attribute__((__const__));
int ilogbl(long double __x) __attribute__((__const__));

double ldexp(double __x, int __exponent);
float ldexpf(float __x, int __exponent);
long double ldexpl(long double __x, int __exponent);

double log(double __x);
float logf(float __x);
long double logl(long double __x);

double log10(double __x);
float log10f(float __x);
long double log10l(long double __x);

double log1p(double __x);
float log1pf(float __x);
long double log1pl(long double __x);

double log2(double __x);
float log2f(float __x);
long double log2l(long double __x);

double logb(double __x);
float logbf(float __x);
long double logbl(long double __x);

double modf(double __x, double* _Nonnull __integral_part);
float modff(float __x, float* _Nonnull __integral_part);
long double modfl(long double __x, long double* _Nonnull __integral_part);

double scalbn(double __x, int __exponent);
float scalbnf(float __x, int __exponent);
long double scalbnl(long double __x, int __exponent);

double scalbln(double __x, long __exponent);
float scalblnf(float __x, long __exponent);
long double scalblnl(long double __x, long __exponent);

double cbrt(double __x);
float cbrtf(float __x);
long double cbrtl(long double __x);

double fabs(double __x) __attribute__((__const__));
float fabsf(float __x) __attribute__((__const__));
long double fabsl(long double __x) __attribute__((__const__));

double hypot(double __x, double __y);
float hypotf(float __x, float __y);
long double hypotl(long double __x, long double __y);

double pow(double __x, double __y);
float powf(float __x, float __y);
long double powl(long double __x, long double __y);

double sqrt(double __x);
float sqrtf(float __x);
long double sqrtl(long double __x);

double erf(double __x);
float erff(float __x);
long double erfl(long double __x);

double erfc(double __x);
float erfcf(float __x);
long double erfcl(long double __x);

double lgamma(double __x);
float lgammaf(float __x);
long double lgammal(long double __x);

double tgamma(double __x);
float tgammaf(float __x);
long double tgammal(long double __x);

double ceil(double __x);
float ceilf(float __x);
long double ceill(long double __x);

double floor(double __x);
float floorf(float __x);
long double floorl(long double __x);

double nearbyint(double __x);
float nearbyintf(float __x);
long double nearbyintl(long double __x);

double rint(double __x);
float rintf(float __x);
long double rintl(long double __x);

long lrint(double __x);
long lrintf(float __x);
long lrintl(long double __x);

long long llrint(double __x);
long long llrintf(float __x);
long long llrintl(long double __x);

double round(double __x);
float roundf(float __x);
long double roundl(long double __x);

long lround(double __x);
long lroundf(float __x);
long lroundl(long double __x);

long long llround(double __x);
long long llroundf(float __x);
long long llroundl(long double __x);

double trunc(double __x);
float truncf(float __x);
long double truncl(long double __x);

double fmod(double __x, double __y);
float fmodf(float __x, float __y);
long double fmodl(long double __x, long double __y);

double remainder(double __x, double __y);
float remainderf(float __x, float __y);
long double remainderl(long double __x, long double __y);

double remquo(double __x, double __y, int* _Nonnull __quotient_bits);
float remquof(float __x, float __y, int* _Nonnull __quotient_bits);
long double remquol(long double __x, long double __y, int* _Nonnull __quotient_bits);

double copysign(double __value, double __sign) __attribute__((__const__));
float copysignf(float __value, float __sign) __attribute__((__const__));
long double copysignl(long double __value, long double __sign) __attribute__((__const__));

double nan(const char* _Nonnull __kind) __attribute__((__const__));
float nanf(const char* _Nonnull __kind) __attribute__((__const__));
long double nanl(const char* _Nonnull __kind) __attribute__((__const__));

double nextafter(double __x, double __y);
float nextafterf(float __x, float __y);
long double nextafterl(long double __x, long double __y);

double nexttoward(double __x, long double __y);
float nexttowardf(float __x, long double __y);
long double nexttowardl(long double __x, long double __y);

double fdim(double __x, double __y);
float fdimf(float __x, float __y);
long double fdiml(long double __x, long double __y);

double fmax(double __x, double __y) __attribute__((__const__));
float fmaxf(float __x, float __y) __attribute__((__const__));
long double fmaxl(long double __x, long double __y) __attribute__((__const__));

double fmin(double __x, double __y) __attribute__((__const__));
float fminf(float __x, float __y) __attribute__((__const__));
long double fminl(long double __x, long double __y) __attribute__((__const__));

double fma(double __x, double __y, double __z);
float fmaf(float __x, float __y, float __z);
long double fmal(long double __x, long double __y, long double __z);
# 322 "/data/data/com.termux/files/usr/include/math.h" 3 4
int (isinf)(double __x) __attribute__((__const__));
int (isnan)(double __x) __attribute__((__const__));



extern int signgam;

double j0(double __x);
double j1(double __x);
double jn(int __n, double __x);
double y0(double __x);
double y1(double __x);
double yn(int __n, double __x);
# 18 "find_lon.c" 2

# 1 "./swephexp.h" 1
# 82 "./swephexp.h"
# 1 "./sweodef.h" 1
# 166 "./sweodef.h"
# 1 "/data/data/com.termux/files/usr/include/unistd.h" 1 3 4
# 31 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 32 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4


# 1 "/data/data/com.termux/files/usr/include/sys/select.h" 1 3 4
# 39 "/data/data/com.termux/files/usr/include/sys/select.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/linux/time.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/bits/timespec.h" 1 3 4
# 46 "/data/data/com.termux/files/usr/include/bits/timespec.h" 3 4
struct timespec {

  time_t tv_sec;

  long tv_nsec;
};
# 10 "/data/data/com.termux/files/usr/include/linux/time.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/linux/time_types.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/linux/time.h" 1 3 4
# 10 "/data/data/com.termux/files/usr/include/linux/time_types.h" 2 3 4

struct __kernel_timespec {
  __kernel_time64_t tv_sec;
  long long tv_nsec;
};
struct __kernel_itimerspec {
  struct __kernel_timespec it_interval;
  struct __kernel_timespec it_value;
};
struct __kernel_old_timespec {
  __kernel_old_time_t tv_sec;
  long tv_nsec;
};
struct __kernel_sock_timeval {
  __s64 tv_sec;
  __s64 tv_usec;
};
# 12 "/data/data/com.termux/files/usr/include/linux/time.h" 2 3 4



struct timeval {
  __kernel_old_time_t tv_sec;
  __kernel_suseconds_t tv_usec;
};
struct itimerspec {
  struct timespec it_interval;
  struct timespec it_value;
};
struct itimerval {
  struct timeval it_interval;
  struct timeval it_value;
};
struct timezone {
  int tz_minuteswest;
  int tz_dsttime;
};
# 40 "/data/data/com.termux/files/usr/include/sys/select.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/signal.h" 1 3 4
# 35 "/data/data/com.termux/files/usr/include/signal.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/sigcontext.h" 1 3 4
# 11 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/sigcontext.h" 3 4
struct sigcontext {
  __u64 fault_address;
  __u64 regs[31];
  __u64 sp;
  __u64 pc;
  __u64 pstate;
  __u8 __reserved[4096] __attribute__((__aligned__(16)));
};
struct _aarch64_ctx {
  __u32 magic;
  __u32 size;
};

struct fpsimd_context {
  struct _aarch64_ctx head;
  __u32 fpsr;
  __u32 fpcr;
  __uint128_t vregs[32];
};

struct esr_context {
  struct _aarch64_ctx head;
  __u64 esr;
};

struct extra_context {
  struct _aarch64_ctx head;
  __u64 datap;
  __u32 size;
  __u32 __reserved[3];
};

struct sve_context {
  struct _aarch64_ctx head;
  __u16 vl;
  __u16 flags;
  __u16 __reserved[2];
};


struct tpidr2_context {
  struct _aarch64_ctx head;
  __u64 tpidr2;
};

struct za_context {
  struct _aarch64_ctx head;
  __u16 vl;
  __u16 __reserved[3];
};

struct zt_context {
  struct _aarch64_ctx head;
  __u16 nregs;
  __u16 __reserved[3];
};

# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/sve_context.h" 1 3 4
# 69 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/sigcontext.h" 2 3 4
# 36 "/data/data/com.termux/files/usr/include/signal.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/bits/signal_types.h" 1 3 4
# 34 "/data/data/com.termux/files/usr/include/bits/signal_types.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/linux/signal.h" 1 3 4








# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/signal.h" 1 3 4
# 12 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/signal.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/asm-generic/signal.h" 1 3 4
# 56 "/data/data/com.termux/files/usr/include/asm-generic/signal.h" 3 4
typedef struct {
  unsigned long sig[(64 / 64)];
} sigset_t;
typedef unsigned long old_sigset_t;
# 1 "/data/data/com.termux/files/usr/include/asm-generic/signal-defs.h" 1 3 4
# 45 "/data/data/com.termux/files/usr/include/asm-generic/signal-defs.h" 3 4
typedef void __signalfn_t(int);
typedef __signalfn_t * __sighandler_t;
typedef void __restorefn_t(void);
typedef __restorefn_t * __sigrestore_t;
# 61 "/data/data/com.termux/files/usr/include/asm-generic/signal.h" 2 3 4



struct __kernel_sigaction {
  __sighandler_t sa_handler;
  unsigned long sa_flags;

  __sigrestore_t sa_restorer;

  sigset_t sa_mask;
};
typedef struct sigaltstack {
  void * ss_sp;
  int ss_flags;
  __kernel_size_t ss_size;
} stack_t;
# 13 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/signal.h" 2 3 4
# 10 "/data/data/com.termux/files/usr/include/linux/signal.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/siginfo.h" 1 3 4






# 1 "/data/data/com.termux/files/usr/include/asm-generic/siginfo.h" 1 3 4
# 11 "/data/data/com.termux/files/usr/include/asm-generic/siginfo.h" 3 4
typedef union sigval {
  int sival_int;
  void * sival_ptr;
} sigval_t;
# 25 "/data/data/com.termux/files/usr/include/asm-generic/siginfo.h" 3 4
union __sifields {
  struct {
    __kernel_pid_t _pid;
    __kernel_uid32_t _uid;
  } _kill;
  struct {
    __kernel_timer_t _tid;
    int _overrun;
    sigval_t _sigval;
    int _sys_private;
  } _timer;
  struct {
    __kernel_pid_t _pid;
    __kernel_uid32_t _uid;
    sigval_t _sigval;
  } _rt;
  struct {
    __kernel_pid_t _pid;
    __kernel_uid32_t _uid;
    int _status;
    __kernel_clock_t _utime;
    __kernel_clock_t _stime;
  } _sigchld;
  struct {
    void * _addr;

    union {
      int _trapno;
      short _addr_lsb;
      struct {
        char _dummy_bnd[(__alignof__(void *) < sizeof(short) ? sizeof(short) : __alignof__(void *))];
        void * _lower;
        void * _upper;
      } _addr_bnd;
      struct {
        char _dummy_pkey[(__alignof__(void *) < sizeof(short) ? sizeof(short) : __alignof__(void *))];
        __u32 _pkey;
      } _addr_pkey;
      struct {
        unsigned long _data;
        __u32 _type;
        __u32 _flags;
      } _perf;
    };
  } _sigfault;
  struct {
    long _band;
    int _fd;
  } _sigpoll;
  struct {
    void * _call_addr;
    int _syscall;
    unsigned int _arch;
  } _sigsys;
};







typedef struct siginfo {
  union {
    struct { int si_signo; int si_errno; int si_code; union __sifields _sifields; };
    int _si_pad[128 / sizeof(int)];
  };
} siginfo_t;
# 215 "/data/data/com.termux/files/usr/include/asm-generic/siginfo.h" 3 4
typedef struct sigevent {
  sigval_t sigev_value;
  int sigev_signo;
  int sigev_notify;
  union {
    int _pad[((64 - (sizeof(int) * 2 + sizeof(sigval_t))) / sizeof(int))];
    int _tid;
    struct {
      void(* _function) (sigval_t);
      void * _attribute;
    } _sigev_thread;
  } _sigev_un;
} sigevent_t;
# 8 "/data/data/com.termux/files/usr/include/aarch64-linux-android/asm/siginfo.h" 2 3 4
# 11 "/data/data/com.termux/files/usr/include/linux/signal.h" 2 3 4
# 35 "/data/data/com.termux/files/usr/include/bits/signal_types.h" 2 3 4
# 46 "/data/data/com.termux/files/usr/include/bits/signal_types.h" 3 4
typedef int sig_atomic_t;

typedef __sighandler_t sig_t;
typedef __sighandler_t sighandler_t;





typedef sigset_t sigset64_t;
# 76 "/data/data/com.termux/files/usr/include/bits/signal_types.h" 3 4
struct sigaction { int sa_flags; union { sighandler_t sa_handler; void (*sa_sigaction)(int, struct siginfo*, void*); }; sigset_t sa_mask; void (*sa_restorer)(void); };
struct sigaction64 { int sa_flags; union { sighandler_t sa_handler; void (*sa_sigaction)(int, struct siginfo*, void*); }; sigset_t sa_mask; void (*sa_restorer)(void); };
# 38 "/data/data/com.termux/files/usr/include/signal.h" 2 3 4



# 1 "/data/data/com.termux/files/usr/include/sys/ucontext.h" 1 3 4
# 33 "/data/data/com.termux/files/usr/include/sys/ucontext.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/signal.h" 1 3 4
# 34 "/data/data/com.termux/files/usr/include/sys/ucontext.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/sys/user.h" 1 3 4
# 32 "/data/data/com.termux/files/usr/include/sys/user.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 1 3 4
# 88 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_ptrdiff_t.h" 1 3 4
# 89 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4




# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_size_t.h" 1 3 4
# 94 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 103 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_wchar_t.h" 1 3 4
# 104 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 128 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 3 4
# 1 "/data/data/com.termux/files/usr/lib/clang/20/include/__stddef_offsetof.h" 1 3 4
# 129 "/data/data/com.termux/files/usr/lib/clang/20/include/stddef.h" 2 3 4
# 33 "/data/data/com.termux/files/usr/include/sys/user.h" 2 3 4


# 1 "/data/data/com.termux/files/usr/include/bits/page_size.h" 1 3 4
# 36 "/data/data/com.termux/files/usr/include/sys/user.h" 2 3 4
# 222 "/data/data/com.termux/files/usr/include/sys/user.h" 3 4
struct user_regs_struct {
  uint64_t regs[31];
  uint64_t sp;
  uint64_t pc;
  uint64_t pstate;
};
struct user_fpsimd_struct {
  __uint128_t vregs[32];
  uint32_t fpsr;
  uint32_t fpcr;
};
# 35 "/data/data/com.termux/files/usr/include/sys/ucontext.h" 2 3 4
# 105 "/data/data/com.termux/files/usr/include/sys/ucontext.h" 3 4
typedef unsigned long greg_t;
typedef greg_t gregset_t[34];
typedef struct user_fpsimd_struct fpregset_t;


typedef struct sigcontext mcontext_t;

typedef struct ucontext {
  unsigned long uc_flags;
  struct ucontext *uc_link;
  stack_t uc_stack;
  union {
    sigset_t uc_sigmask;
    sigset64_t uc_sigmask64;
  };

  char __padding[128 - sizeof(sigset_t)];
  mcontext_t uc_mcontext;
} ucontext_t;
# 42 "/data/data/com.termux/files/usr/include/signal.h" 2 3 4
# 54 "/data/data/com.termux/files/usr/include/signal.h" 3 4
int __libc_current_sigrtmin(void);
int __libc_current_sigrtmax(void);

extern const char* _Nonnull const sys_siglist[(64 + 1)];
extern const char* _Nonnull const sys_signame[(64 + 1)];



int sigaction(int __signal, const struct sigaction* _Nullable __new_action, struct sigaction* _Nullable __old_action);






int siginterrupt(int __signal, int __flag);

sighandler_t _Nonnull signal(int __signal, sighandler_t _Nullable __handler);
int sigaddset(sigset_t* _Nonnull __set, int __signal);





int sigdelset(sigset_t* _Nonnull __set, int __signal);





int sigemptyset(sigset_t* _Nonnull __set);





int sigfillset(sigset_t* _Nonnull __set);





int sigismember(const sigset_t* _Nonnull __set, int __signal);






int sigpending(sigset_t* _Nonnull __set);





int sigprocmask(int __how, const sigset_t* _Nullable __new_set, sigset_t* _Nullable __old_set);





int sigsuspend(const sigset_t* _Nonnull __mask);





int sigwait(const sigset_t* _Nonnull __set, int* _Nonnull __signal);
# 145 "/data/data/com.termux/files/usr/include/signal.h" 3 4
int raise(int __signal);
int kill(pid_t __pid, int __signal);
int killpg(int __pgrp, int __signal);
int tgkill(int __tgid, int __tid, int __signal);

int sigaltstack(const stack_t* _Nullable __new_signal_stack, stack_t* _Nullable __old_signal_stack);

void psiginfo(const siginfo_t* _Nonnull __info, const char* _Nullable __msg);
void psignal(int __signal, const char* _Nullable __msg);

int pthread_kill(pthread_t __pthread, int __signal);
# 164 "/data/data/com.termux/files/usr/include/signal.h" 3 4
int pthread_sigmask(int __how, const sigset_t* _Nullable __new_set, sigset_t* _Nullable __old_set);
# 173 "/data/data/com.termux/files/usr/include/signal.h" 3 4
int sigqueue(pid_t __pid, int __signal, const union sigval __value) __attribute__((__availability__(android,strict,introduced=23 )));
int sigtimedwait(const sigset_t* _Nonnull __set, siginfo_t* _Nullable __info, const struct timespec* _Nullable __timeout) __attribute__((__availability__(android,strict,introduced=23 )));
# 184 "/data/data/com.termux/files/usr/include/signal.h" 3 4
int sigwaitinfo(const sigset_t* _Nonnull __set, siginfo_t* _Nullable __info) __attribute__((__availability__(android,strict,introduced=23 )));
# 41 "/data/data/com.termux/files/usr/include/sys/select.h" 2 3 4



typedef unsigned long fd_mask;
# 57 "/data/data/com.termux/files/usr/include/sys/select.h" 3 4
typedef struct {
  fd_mask fds_bits[1024/(8 * sizeof(fd_mask))];
} fd_set;
# 74 "/data/data/com.termux/files/usr/include/sys/select.h" 3 4
void __FD_CLR_chk(int, fd_set* _Nonnull , size_t);
void __FD_SET_chk(int, fd_set* _Nonnull, size_t);
int __FD_ISSET_chk(int, const fd_set* _Nonnull, size_t);
# 98 "/data/data/com.termux/files/usr/include/sys/select.h" 3 4
int select(int __max_fd_plus_one, fd_set* _Nullable __read_fds, fd_set* _Nullable __write_fds, fd_set* _Nullable __exception_fds, struct timeval* _Nullable __timeout);
# 109 "/data/data/com.termux/files/usr/include/sys/select.h" 3 4
int pselect(int __max_fd_plus_one, fd_set* _Nullable __read_fds, fd_set* _Nullable __write_fds, fd_set* _Nullable __exception_fds, const struct timespec* _Nullable __timeout, const sigset_t* _Nullable __mask);
# 35 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4

# 1 "/data/data/com.termux/files/usr/include/bits/fcntl.h" 1 3 4
# 46 "/data/data/com.termux/files/usr/include/bits/fcntl.h" 3 4
int fcntl(int __fd, int __op, ...);
# 37 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/getentropy.h" 1 3 4
# 38 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/getopt.h" 1 3 4
# 41 "/data/data/com.termux/files/usr/include/bits/getopt.h" 3 4
int getopt(int __argc, char* const _Nonnull __argv[_Nullable], const char* _Nonnull __options);




extern char* _Nullable optarg;






extern int optind;






extern int opterr;




extern int optopt;
# 39 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/ioctl.h" 1 3 4
# 43 "/data/data/com.termux/files/usr/include/bits/ioctl.h" 3 4
int ioctl(int __fd, int __op, ...);
# 60 "/data/data/com.termux/files/usr/include/bits/ioctl.h" 3 4
int ioctl(int __fd, unsigned __op, ...) __attribute__((__overloadable__)) __attribute__((__enable_if__(1, ""))) __asm__("ioctl");
# 40 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/lockf.h" 1 3 4
# 61 "/data/data/com.termux/files/usr/include/bits/lockf.h" 3 4
int lockf(int __fd, int __op, off_t __length) __attribute__((__availability__(android,strict,introduced=24 )));





int lockf64(int __fd, int __op, off64_t __length) __attribute__((__availability__(android,strict,introduced=24 )));
# 41 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4


# 1 "/data/data/com.termux/files/usr/include/bits/sysconf.h" 1 3 4
# 347 "/data/data/com.termux/files/usr/include/bits/sysconf.h" 3 4
long sysconf(int __name);
# 44 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4
# 77 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
extern char* _Nullable * _Nullable environ;

__attribute__((__noreturn__)) void _exit(int __status);
# 88 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
pid_t fork(void);
# 118 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
pid_t vfork(void) __attribute__((__returns_twice__));







pid_t getpid(void);







pid_t gettid(void);

pid_t getpgid(pid_t __pid);
int setpgid(pid_t __pid, pid_t __pgid);
pid_t getppid(void);
pid_t getpgrp(void);
int setpgrp(void);
pid_t getsid(pid_t __pid);
pid_t setsid(void);

int execv(const char* _Nonnull __path, char* _Nullable const* _Nullable __argv);
int execvp(const char* _Nonnull __file, char* _Nullable const* _Nullable __argv);
int execvpe(const char* _Nonnull __file, char* _Nullable const* _Nullable __argv, char* _Nullable const* _Nullable __envp);
int execve(const char* _Nonnull __file, char* _Nullable const* _Nullable __argv, char* _Nullable const* _Nullable __envp);
int execl(const char* _Nonnull __path, const char* _Nullable __arg0, ...) __attribute__((__sentinel__));
int execlp(const char* _Nonnull __file, const char* _Nullable __arg0, ...) __attribute__((__sentinel__));
int execle(const char* _Nonnull __path, const char* _Nullable __arg0, ... )
    __attribute__((__sentinel__(1)));






int nice(int __incr);
# 169 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setegid(gid_t __gid);
# 180 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int seteuid(uid_t __uid);
# 191 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setgid(gid_t __gid);
# 202 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setregid(gid_t __rgid, gid_t __egid);
# 213 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setresgid(gid_t __rgid, gid_t __egid, gid_t __sgid);
# 224 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setresuid(uid_t __ruid, uid_t __euid, uid_t __suid);
# 235 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setreuid(uid_t __ruid, uid_t __euid);
# 246 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int setuid(uid_t __uid);

uid_t getuid(void);
uid_t geteuid(void);
gid_t getgid(void);
gid_t getegid(void);
int getgroups(int __size, gid_t* _Nullable __list);
int setgroups(size_t __size, const gid_t* _Nullable __list);
int getresuid(uid_t* _Nonnull __ruid, uid_t* _Nonnull __euid, uid_t* _Nonnull __suid);
int getresgid(gid_t* _Nonnull __rgid, gid_t* _Nonnull __egid, gid_t* _Nonnull __sgid);
char* _Nullable getlogin(void);






long fpathconf(int __fd, int __name);
long pathconf(const char* _Nonnull __path, int __name);

int access(const char* _Nonnull __path, int __mode);
int faccessat(int __dirfd, const char* _Nonnull __path, int __mode, int __flags);
int link(const char* _Nonnull __old_path, const char* _Nonnull __new_path);
int linkat(int __old_dir_fd, const char* _Nonnull __old_path, int __new_dir_fd, const char* _Nonnull __new_path, int __flags);
int unlink(const char* _Nonnull __path);
int unlinkat(int __dirfd, const char* _Nonnull __path, int __flags);
int chdir(const char* _Nonnull __path);
int fchdir(int __fd);
int rmdir(const char* _Nonnull __path);
int pipe(int __fds[_Nonnull 2]);



int chroot(const char* _Nonnull __path);
int symlink(const char* _Nonnull __old_path, const char* _Nonnull __new_path);
int symlinkat(const char* _Nonnull __old_path, int __new_dir_fd, const char* _Nonnull __new_path);
ssize_t readlink(const char* _Nonnull __path, char* _Nonnull __buf, size_t __buf_size);
ssize_t readlinkat(int __dir_fd, const char* _Nonnull __path, char* _Nonnull __buf, size_t __buf_size);
int chown(const char* _Nonnull __path, uid_t __owner, gid_t __group);
int fchown(int __fd, uid_t __owner, gid_t __group);
int fchownat(int __dir_fd, const char* _Nonnull __path, uid_t __owner, gid_t __group, int __flags);
int lchown(const char* _Nonnull __path, uid_t __owner, gid_t __group);
char* _Nullable getcwd(char* _Nullable __buf, size_t __size);

void sync(void);
# 299 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int close(int __fd);
# 311 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
ssize_t read(int __fd, void* _Null_unspecified __buf, size_t __count);
# 323 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
ssize_t write(int __fd, const void* _Null_unspecified __buf, size_t __count);

int dup(int __old_fd);
int dup2(int __old_fd, int __new_fd);
int dup3(int __old_fd, int __new_fd, int __flags);
int fsync(int __fd);
int fdatasync(int __fd);
# 339 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int truncate(const char* _Nonnull __path, off_t __length);
off_t lseek(int __fd, off_t __offset, int __whence);
ssize_t pread(int __fd, void* _Nonnull __buf, size_t __count, off_t __offset);
ssize_t pwrite(int __fd, const void* _Nonnull __buf, size_t __count, off_t __offset);
int ftruncate(int __fd, off_t __length);


int truncate64(const char* _Nonnull __path, off64_t __length);
off64_t lseek64(int __fd, off64_t __offset, int __whence);
ssize_t pread64(int __fd, void* _Nonnull __buf, size_t __count, off64_t __offset);
ssize_t pwrite64(int __fd, const void* _Nonnull __buf, size_t __count, off64_t __offset);
int ftruncate64(int __fd, off64_t __length);

int pause(void);
unsigned int alarm(unsigned int __seconds);
unsigned int sleep(unsigned int __seconds);
int usleep(useconds_t __microseconds);

int gethostname(char* _Nonnull _buf, size_t __buf_size);


int sethostname(const char* _Nonnull __name, size_t __n) __attribute__((__availability__(android,strict,introduced=23 )));



int brk(void* _Nonnull __addr);
void* _Nullable sbrk(ptrdiff_t __increment);

int isatty(int __fd);
char* _Nullable ttyname(int __fd);
int ttyname_r(int __fd, char* _Nonnull __buf, size_t __buf_size);

int acct(const char* _Nullable __path);
# 380 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
int getpagesize(void) __attribute__((__const__));

long syscall(long __number, ...);

int daemon(int __no_chdir, int __no_close);
# 394 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
pid_t tcgetpgrp(int __fd);
int tcsetpgrp(int __fd, pid_t __pid);
# 463 "/data/data/com.termux/files/usr/include/unistd.h" 3 4
static __inline__ char* getpass(const char* prompt) {

    struct _termios {
        unsigned int c_iflag;
        unsigned int c_oflag;
        unsigned int c_cflag;
        unsigned int c_lflag;
        unsigned char c_line;
        unsigned char c_cc[19 ];
    };

    struct _termios term_old, term_new;
    static char password[513] = { 0 };
    int len = 0, tty_changed = 0;


    while (*prompt) {
        write(1, prompt, 1);
        prompt++;
    }


    if (ioctl(0, 0x5401 , &term_old) == 0) {
        term_new = term_old;
        term_new.c_lflag &= ~0000010;

        if (ioctl(0, 0x5402+0 , &term_new) == 0) {
            tty_changed = 1;
        } else {
            tty_changed = 0;
        }
    }


    char chr;
    while (read(0, &chr, sizeof(char)) > 0) {
        if (chr == '\r' || chr == '\n' || chr == 0) {
            break;
        }

        if (len == sizeof(password)-1) {


            continue;
        } else {
            password[len++] = chr;
        }
    }
    password[len] = 0;


    if (tty_changed) {
        ioctl(0, 0x5402+0 , &term_old);
    }


    write(1, "\n", 1);

    return password;
}




# 1 "/data/data/com.termux/files/usr/include/android/legacy_unistd_inlines.h" 1 3 4
# 36 "/data/data/com.termux/files/usr/include/android/legacy_unistd_inlines.h" 3 4
# 1 "/data/data/com.termux/files/usr/include/bits/swab.h" 1 3 4
# 41 "/data/data/com.termux/files/usr/include/bits/swab.h" 3 4
static __inline__ void swab(const void* _Nonnull __void_src, void* _Nonnull __void_dst, ssize_t __byte_count) {
  const uint8_t* __src = ((const uint8_t*) (__void_src));
  uint8_t* __dst = ((uint8_t*) (__void_dst));
  while (__byte_count > 1) {
    uint8_t x = *__src++;
    uint8_t y = *__src++;
    *__dst++ = y;
    *__dst++ = x;
    __byte_count -= 2;
  }
}
# 37 "/data/data/com.termux/files/usr/include/android/legacy_unistd_inlines.h" 2 3 4
# 528 "/data/data/com.termux/files/usr/include/unistd.h" 2 3 4
# 167 "./sweodef.h" 2
# 203 "./sweodef.h"
  typedef int int32;
  typedef long long int64;
  typedef unsigned int uint32;
  typedef short int16;
  typedef double REAL8;
  typedef int INT4;
  typedef unsigned int UINT4;

  typedef int AS_BOOL;
  typedef unsigned short UINT2;
# 242 "./sweodef.h"
typedef unsigned char UCHAR;
# 268 "./sweodef.h"
typedef int32 centisec;
# 323 "./sweodef.h"
# 1 "/data/data/com.termux/files/usr/include/ctype.h" 1 3 4
# 74 "/data/data/com.termux/files/usr/include/ctype.h" 3 4
extern const char* _ctype_;


static __inline__ int isalpha(int __ch) {
  return (__ch >= 'A' && __ch <= 'Z') || (__ch >= 'a' && __ch <= 'z');
}


static __inline__ int isblank(int __ch) {
  return __ch == ' ' || __ch == '\t';
}


static __inline__ int iscntrl(int __ch) {
  return (((unsigned) (__ch)) < ' ') || __ch == 0x7f;
}


static __inline__ int isdigit(int __ch) {
  return (__ch >= '0' && __ch <= '9');
}


static __inline__ int isgraph(int __ch) {
  return (__ch >= '!' && __ch <= '~');
}


static __inline__ int islower(int __ch) {
  return (__ch >= 'a' && __ch <= 'z');
}


static __inline__ int isprint(int __ch) {
  return (__ch >= ' ' && __ch <= '~');
}


static __inline__ int isspace(int __ch) {
  return __ch == ' ' || (__ch >= '\t' && __ch <= '\r');
}


static __inline__ int isupper(int __ch) {
  return (__ch >= 'A' && __ch <= 'Z');
}


static __inline__ int isxdigit(int __ch) {
  return (__ch >= '0' && __ch <= '9') || (__ch >= 'a' && __ch <= 'f') || (__ch >= 'A' && __ch <= 'F');
}


static __inline__ int isalnum(int __ch) {
  return isalpha(__ch) || isdigit(__ch);
}


static __inline__ int ispunct(int __ch) {
  return isgraph(__ch) && !isalnum(__ch);
}






static __inline__ int _tolower(int __ch) {
  return __ch | 0x20;
}


static __inline__ int tolower(int __ch) {
  if (__ch >= 'A' && __ch <= 'Z') return _tolower(__ch);
  return __ch;
}






static __inline__ int _toupper(int __ch) {


  return __ch ^ 0x20;
}


static __inline__ int toupper(int __ch) {
  if (__ch >= 'a' && __ch <= 'z') return _toupper(__ch);
  return __ch;
}


static __inline__ int isascii(int __ch) {
  return ((unsigned) (__ch)) < 0x80;
}


static __inline__ int toascii(int __ch) {
  return __ch & 0x7f;
}


static __inline__ int isalnum_l(int __ch, locale_t __l) {
  return isalnum(__ch);
}


static __inline__ int isalpha_l(int __ch, locale_t __l) {
  return isalpha(__ch);
}


static __inline__ int isblank_l(int __ch, locale_t __l) {
  return isblank(__ch);
}


static __inline__ int iscntrl_l(int __ch, locale_t __l) {
  return iscntrl(__ch);
}


static __inline__ int isdigit_l(int __ch, locale_t __l) {
  return isdigit(__ch);
}


static __inline__ int isgraph_l(int __ch, locale_t __l) {
  return isgraph(__ch);
}


static __inline__ int islower_l(int __ch, locale_t __l) {
  return islower(__ch);
}


static __inline__ int isprint_l(int __ch, locale_t __l) {
  return isprint(__ch);
}


static __inline__ int ispunct_l(int __ch, locale_t __l) {
  return ispunct(__ch);
}


static __inline__ int isspace_l(int __ch, locale_t __l) {
  return isspace(__ch);
}


static __inline__ int isupper_l(int __ch, locale_t __l) {
  return isupper(__ch);
}


static __inline__ int isxdigit_l(int __ch, locale_t __l) {
  return isxdigit(__ch);
}


static __inline__ int tolower_l(int __ch, locale_t __l) {
  return tolower(__ch);
}


static __inline__ int toupper_l(int __ch, locale_t __l) {
  return toupper(__ch);
}
# 324 "./sweodef.h" 2
# 83 "./swephexp.h" 2
# 676 "./swephexp.h"
extern int32 swe_heliacal_ut(double tjdstart_ut, double *geopos, double *datm, double *dobs, char *ObjectName, int32 TypeEvent, int32 iflag, double *dret, char *serr);
extern int32 swe_heliacal_pheno_ut(double tjd_ut, double *geopos, double *datm, double *dobs, char *ObjectName, int32 TypeEvent, int32 helflag, double *darr, char *serr);
extern int32 swe_vis_limit_mag(double tjdut, double *geopos, double *datm, double *dobs, char *ObjectName, int32 helflag, double *dret, char *serr);


extern int32 swe_heliacal_angle(double tjdut, double *dgeo, double *datm, double *dobs, int32 helflag, double mag, double azi_obj, double azi_sun, double azi_moon, double alt_moon, double *dret, char *serr);
extern int32 swe_topo_arcus_visionis(double tjdut, double *dgeo, double *datm, double *dobs, int32 helflag, double mag, double azi_obj, double alt_obj, double azi_sun, double azi_moon, double alt_moon, double *dret, char *serr);



extern void swe_set_astro_models(char *samod, int32 iflag);
extern void swe_get_astro_models(char *samod, char *sdet, int32 iflag);





extern char * swe_version(char *);
extern char * swe_get_library_path(char *);


extern int32 swe_calc(
        double tjd, int ipl, int32 iflag,
        double *xx,
        char *serr);

extern int32 swe_calc_ut(double tjd_ut, int32 ipl, int32 iflag,
 double *xx, char *serr);

extern int32 swe_calc_pctr(double tjd, int32 ipl, int32 iplctr, int32 iflag, double *xxret, char *serr);

extern double swe_solcross(double x2cross, double jd_et, int32 flag, char *serr);
extern double swe_solcross_ut(double x2cross, double jd_ut, int32 flag, char *serr);
extern double swe_mooncross(double x2cross, double jd_et, int32 flag, char *serr);
extern double swe_mooncross_ut(double x2cross, double jd_ut, int32 flag, char *serr);
extern double swe_mooncross_node(double jd_et, int32 flag, double *xlon, double *xlat, char *serr);
extern double swe_mooncross_node_ut(double jd_ut, int32 flag, double *xlon, double *xlat, char *serr);
extern int32 swe_helio_cross(int32 ipl, double x2cross, double jd_et, int32 iflag, int32 dir, double *jd_cross, char *serr);
extern int32 swe_helio_cross_ut(int32 ipl, double x2cross, double jd_ut, int32 iflag, int32 dir, double *jd_cross, char *serr);


extern int32 swe_fixstar(
        char *star, double tjd, int32 iflag,
        double *xx,
        char *serr);

extern int32 swe_fixstar_ut(char *star, double tjd_ut, int32 iflag,
 double *xx, char *serr);

extern int32 swe_fixstar_mag(char *star, double *mag, char *serr);

extern int32 swe_fixstar2(
        char *star, double tjd, int32 iflag,
        double *xx,
        char *serr);

extern int32 swe_fixstar2_ut(char *star, double tjd_ut, int32 iflag,
 double *xx, char *serr);

extern int32 swe_fixstar2_mag(char *star, double *mag, char *serr);


extern void swe_close(void);


extern void swe_set_ephe_path(const char *path);


extern void swe_set_jpl_file(const char *fname);


extern char * swe_get_planet_name(int ipl, char *spname);


extern void swe_set_topo(double geolon, double geolat, double geoalt);


extern void swe_set_sid_mode(int32 sid_mode, double t0, double ayan_t0);


extern int32 swe_get_ayanamsa_ex(double tjd_et, int32 iflag, double *daya, char *serr);
extern int32 swe_get_ayanamsa_ex_ut(double tjd_ut, int32 iflag, double *daya, char *serr);
extern double swe_get_ayanamsa(double tjd_et);
extern double swe_get_ayanamsa_ut(double tjd_ut);


extern const char * swe_get_ayanamsa_name(int32 isidmode);
extern const char * swe_get_current_file_data(int ifno, double *tfstart, double *tfend, int *denum);







extern int swe_date_conversion(
        int y , int m , int d ,
        double utime,
        char c,
        double *tjd);

extern double swe_julday(
        int year, int month, int day, double hour,
        int gregflag);

extern void swe_revjul (
        double jd,
        int gregflag,
        int *jyear, int *jmon, int *jday, double *jut);

extern int32 swe_utc_to_jd(
        int32 iyear, int32 imonth, int32 iday,
 int32 ihour, int32 imin, double dsec,
 int32 gregflag, double *dret, char *serr);

extern void swe_jdet_to_utc(
        double tjd_et, int32 gregflag,
 int32 *iyear, int32 *imonth, int32 *iday,
 int32 *ihour, int32 *imin, double *dsec);

extern void swe_jdut1_to_utc(
        double tjd_ut, int32 gregflag,
 int32 *iyear, int32 *imonth, int32 *iday,
 int32 *ihour, int32 *imin, double *dsec);

extern void swe_utc_time_zone(
        int32 iyear, int32 imonth, int32 iday,
 int32 ihour, int32 imin, double dsec,
 double d_timezone,
 int32 *iyear_out, int32 *imonth_out, int32 *iday_out,
 int32 *ihour_out, int32 *imin_out, double *dsec_out);





extern int swe_houses(
        double tjd_ut, double geolat, double geolon, int hsys,
 double *cusps, double *ascmc);

extern int swe_houses_ex(
        double tjd_ut, int32 iflag, double geolat, double geolon, int hsys,
 double *cusps, double *ascmc);

extern int swe_houses_ex2(
        double tjd_ut, int32 iflag, double geolat, double geolon, int hsys,
 double *cusps, double *ascmc, double *cusp_speed, double *ascmc_speed, char *serr);

extern int swe_houses_armc(
        double armc, double geolat, double eps, int hsys,
 double *cusps, double *ascmc);

extern int swe_houses_armc_ex2(
        double armc, double geolat, double eps, int hsys,
 double *cusps, double *ascmc, double *cusp_speed, double *ascmc_speed, char *serr);

extern double swe_house_pos(
 double armc, double geolat, double eps, int hsys, double *xpin, char *serr);

extern const char * swe_house_name(int hsys);







extern int32 swe_gauquelin_sector(double t_ut, int32 ipl, char *starname, int32 iflag, int32 imeth, double *geopos, double atpress, double attemp, double *dgsect, char *serr);



extern int32 swe_sol_eclipse_where(double tjd, int32 ifl, double *geopos, double *attr, char *serr);

extern int32 swe_lun_occult_where(double tjd, int32 ipl, char *starname, int32 ifl, double *geopos, double *attr, char *serr);


extern int32 swe_sol_eclipse_how(double tjd, int32 ifl, double *geopos, double *attr, char *serr);


extern int32 swe_sol_eclipse_when_loc(double tjd_start, int32 ifl, double *geopos, double *tret, double *attr, int32 backward, char *serr);

extern int32 swe_lun_occult_when_loc(double tjd_start, int32 ipl, char *starname, int32 ifl,
     double *geopos, double *tret, double *attr, int32 backward, char *serr);


extern int32 swe_sol_eclipse_when_glob(double tjd_start, int32 ifl, int32 ifltype,
     double *tret, int32 backward, char *serr);


extern int32 swe_lun_occult_when_glob(double tjd_start, int32 ipl, char *starname, int32 ifl, int32 ifltype,
     double *tret, int32 backward, char *serr);


extern int32 swe_lun_eclipse_how(
          double tjd_ut,
          int32 ifl,
          double *geopos,
          double *attr,
          char *serr);

extern int32 swe_lun_eclipse_when(double tjd_start, int32 ifl, int32 ifltype,
     double *tret, int32 backward, char *serr);

extern int32 swe_lun_eclipse_when_loc(double tjd_start, int32 ifl,
     double *geopos, double *tret, double *attr, int32 backward, char *serr);


extern int32 swe_pheno(double tjd, int32 ipl, int32 iflag, double *attr, char *serr);

extern int32 swe_pheno_ut(double tjd_ut, int32 ipl, int32 iflag, double *attr, char *serr);

extern double swe_refrac(double inalt, double atpress, double attemp, int32 calc_flag);

extern double swe_refrac_extended(double inalt, double geoalt, double atpress, double attemp, double lapse_rate, int32 calc_flag, double *dret);

extern void swe_set_lapse_rate(double lapse_rate);

extern void swe_azalt(
      double tjd_ut,
      int32 calc_flag,
      double *geopos,
      double atpress,
      double attemp,
      double *xin,
      double *xaz);

extern void swe_azalt_rev(
      double tjd_ut,
      int32 calc_flag,
      double *geopos,
      double *xin,
      double *xout);

extern int32 swe_rise_trans_true_hor(
               double tjd_ut, int32 ipl, char *starname,
        int32 epheflag, int32 rsmi,
               double *geopos,
        double atpress, double attemp,
        double horhgt,
               double *tret,
               char *serr);

extern int32 swe_rise_trans(
               double tjd_ut, int32 ipl, char *starname,
        int32 epheflag, int32 rsmi,
               double *geopos,
        double atpress, double attemp,
               double *tret,
               char *serr);

extern int32 swe_nod_aps(double tjd_et, int32 ipl, int32 iflag,
                      int32 method,
                      double *xnasc, double *xndsc,
                      double *xperi, double *xaphe,
                      char *serr);

extern int32 swe_nod_aps_ut(double tjd_ut, int32 ipl, int32 iflag,
                      int32 method,
                      double *xnasc, double *xndsc,
                      double *xperi, double *xaphe,
                      char *serr);
extern int32 swe_get_orbital_elements(
  double tjd_et, int32 ipl, int32 iflag, double *dret, char *serr);

extern int32 swe_orbit_max_min_true_distance(double tjd_et, int32 ipl, int32 iflag, double *dmax, double *dmin, double *dtrue, char *serr);






extern double swe_deltat(double tjd);
extern double swe_deltat_ex(double tjd, int32 iflag, char *serr);


extern int32 swe_time_equ(double tjd, double *te, char *serr);
extern int32 swe_lmt_to_lat(double tjd_lmt, double geolon, double *tjd_lat, char *serr);
extern int32 swe_lat_to_lmt(double tjd_lat, double geolon, double *tjd_lmt, char *serr);


extern double swe_sidtime0(double tjd_ut, double eps, double nut);
extern double swe_sidtime(double tjd_ut);
extern void swe_set_interpolate_nut(AS_BOOL do_interpolate);


extern void swe_cotrans(double *xpo, double *xpn, double eps);
extern void swe_cotrans_sp(double *xpo, double *xpn, double eps);


extern double swe_get_tid_acc(void);
extern void swe_set_tid_acc(double t_acc);



extern void swe_set_delta_t_userdef(double dt);

extern double swe_degnorm(double x);
extern double swe_radnorm(double x);
extern double swe_rad_midp(double x1, double x0);
extern double swe_deg_midp(double x1, double x0);

extern void swe_split_deg(double ddeg, int32 roundflag, int32 *ideg, int32 *imin, int32 *isec, double *dsecfr, int32 *isgn);
# 986 "./swephexp.h"
extern centisec swe_csnorm(centisec p);


extern centisec swe_difcsn (centisec p1, centisec p2);

extern double swe_difdegn (double p1, double p2);


extern centisec swe_difcs2n(centisec p1, centisec p2);

extern double swe_difdeg2n(double p1, double p2);
extern double swe_difrad2n(double p1, double p2);


extern centisec swe_csroundsec(centisec x);


extern int32 swe_d2l(double x);


extern int swe_day_of_week(double jd);

extern char * swe_cs2timestr(centisec t, int sep, AS_BOOL suppressZero, char *a);

extern char * swe_cs2lonlatstr(centisec t, char pchar, char mchar, char *s);

extern char * swe_cs2degstr(centisec t, char *a);
# 20 "find_lon.c" 2







static double norm360(double a) {
    double r = fmod(a, 360.0);
    if (r < 0.0) r += 360.0;
    return r;
}


static double signed_angle_diff(double angle, double target) {
    double diff = norm360(angle) - norm360(target);
    if (diff > 180.0) diff -= 360.0;
    if (diff <= -180.0) diff += 360.0;
    return diff;
}





static int planet_longitude_ut(double tjd_ut, int planet, int iflag, double *lon, char *serrbuf) {
    double xx[6];
    int rc = swe_calc_ut(tjd_ut, planet, iflag, xx, serrbuf);
    if (rc < 0) {
        return rc;
    }

    *lon = norm360(xx[0]);
    return 0;
}
# 71 "find_lon.c"
double find_event_jd(int planet, double target_deg, double jd_guess,
                     double initial_step_days, double max_bracket_days,
                     int iflag, double tol_seconds) {
    char serr[256] = {0};
    double t0 = jd_guess - initial_step_days;
    double t1 = jd_guess + initial_step_days;
    double lon0, lon1;
    double diff0, diff1;
    int rc;


    rc = planet_longitude_ut(t0, planet, iflag, &lon0, serr);
    if (rc < 0) {
        fprintf(stderr, "swe_calc_ut error at t0 (%.6f): %s\n", t0, serr);
        return -1.0;
    }
    rc = planet_longitude_ut(t1, planet, iflag, &lon1, serr);
    if (rc < 0) {
        fprintf(stderr, "swe_calc_ut error at t1 (%.6f): %s\n", t1, serr);
        return -2.0;
    }

    diff0 = signed_angle_diff(lon0, target_deg);
    diff1 = signed_angle_diff(lon1, target_deg);


    double ang_tol_deg = 360.0 * (tol_seconds / 86400.0) * 2.0;
    if (fabs(diff1) < 1e-8) return t1;


    double step = initial_step_days;
    double total_searched = 2.0 * initial_step_days;
    int iter = 0, max_iters = 2000;

    while (diff0 * diff1 > 0.0 && total_searched < max_bracket_days && iter < max_iters) {
        iter++;

        t0 = t1;
        diff0 = diff1;
        t1 = t1 + step;
        total_searched += step;

        rc = planet_longitude_ut(t1, planet, iflag, &lon1, serr);
        if (rc < 0) {
            fprintf(stderr, "swe_calc_ut error while bracketing (t=%.6f): %s\n", t1, serr);
            return -3.0;
        }
        diff1 = signed_angle_diff(lon1, target_deg);


        if ((iter % 4) == 0) step *= 2.0;
    }

    if (diff0 * diff1 > 0.0) {

        fprintf(stderr, "Failed to bracket crossing within %.1f days\n", total_searched);
        return -4.0;
    }



    double tol_days = tol_seconds / 86400.0;
    double mid, lonmid, diffmid;
    int bisect_iter = 0, bisect_max_iter = 100;

    while ((t1 - t0) > tol_days && bisect_iter < bisect_max_iter) {
        bisect_iter++;
        mid = 0.5 * (t0 + t1);
        rc = planet_longitude_ut(mid, planet, iflag, &lonmid, serr);
        if (rc < 0) {
            fprintf(stderr, "swe_calc_ut error during bisection (mid=%.6f): %s\n", mid, serr);
            return -5.0;
        }
        diffmid = signed_angle_diff(lonmid, target_deg);


        if (fabs(diffmid) < 1e-12) {
            return mid;
        }


        if (diff0 * diffmid <= 0.0) {

            t1 = mid; diff1 = diffmid;
        } else {

            t0 = mid; diff0 = diffmid;
        }
    }


    return 0.5 * (t0 + t1);
}




int main(void) {

    int planet = 0;
    double target = 38.0;


    int year = 2025, month = 8, day = 1;
    double hour = 0.0;
    int gregflag = 1;
    double jd_guess = swe_julday(year, month, day, hour, gregflag);



    int iflag = 2;


    double jd_event = find_event_jd(planet, target, jd_guess, 2.0 ,
                                    365.0 , iflag, 1.0 );

    if (jd_event < 0.0) {
        fprintf(stderr, "Event search failed, code %.6f\n", jd_event);
        return 1;
    }


    int y,m,d;
    double ut;
    swe_revjul(jd_event, 1, &y, &m, &d, &ut);
    int hh = (int)ut;
    int mm = (int)((ut - hh) * 60.0);
    double ssd = ((ut - hh) * 60.0 - mm) * 60.0;
    int ss = (int)(ssd + 0.5);

    printf("Event JD (UT): %.9f\n", jd_event);
    printf("Calendar (UT): %04d-%02d-%02d %02d:%02d:%02d\n", y, m, d, hh, mm, ss);

    return 0;
}
