	.file	"find_lon.c"
	.section	.rodata.cst8,"aM",@progbits,8
	.p2align	3, 0x0                          // -- Begin function find_event_jd
.LCPI0_0:
	.xword	0x3d719799812dea11              // double 9.9999999999999998E-13
.LCPI0_1:
	.xword	0x3e45798ee2308c3a              // double 1.0E-8
	.text
	.globl	find_event_jd
	.p2align	2
	.type	find_event_jd,@function
find_event_jd:                          // @find_event_jd
	.cfi_startproc
// %bb.0:
	sub	sp, sp, #496
	.cfi_def_cfa_offset 496
	stp	x29, x30, [sp, #464]            // 16-byte Folded Spill
	str	x28, [sp, #480]                 // 8-byte Folded Spill
	add	x29, sp, #464
	.cfi_def_cfa w29, 32
	.cfi_offset w28, -16
	.cfi_offset w30, -24
	.cfi_offset w29, -32
	stur	w0, [x29, #-12]
	stur	d0, [x29, #-24]
	stur	d1, [x29, #-32]
	stur	d2, [x29, #-40]
	stur	d3, [x29, #-48]
	stur	w1, [x29, #-52]
	stur	d4, [x29, #-64]
	add	x0, sp, #144
	str	x0, [sp, #8]                    // 8-byte Folded Spill
	mov	x2, #256                        // =0x100
	mov	w1, wzr
	bl	memset
	ldr	x3, [sp, #8]                    // 8-byte Folded Reload
	ldur	d0, [x29, #-32]
	ldur	d1, [x29, #-40]
	fsub	d0, d0, d1
	str	d0, [sp, #136]
	ldur	d0, [x29, #-32]
	ldur	d1, [x29, #-40]
	fadd	d0, d0, d1
	str	d0, [sp, #128]
	ldr	d0, [sp, #136]
	ldur	w0, [x29, #-12]
	ldur	w1, [x29, #-52]
	add	x2, sp, #120
	bl	planet_longitude_ut
	str	w0, [sp, #92]
	ldr	w8, [sp, #92]
	tbz	w8, #31, .LBB0_2
	b	.LBB0_1
.LBB0_1:
	adrp	x8, :got:stderr
	ldr	x8, [x8, :got_lo12:stderr]
	ldr	x0, [x8]
	ldr	d0, [sp, #136]
	adrp	x1, .L.str
	add	x1, x1, :lo12:.L.str
	add	x2, sp, #144
	bl	fprintf
	fmov	d0, #-1.00000000
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_2:
	ldr	d0, [sp, #128]
	ldur	w0, [x29, #-12]
	ldur	w1, [x29, #-52]
	add	x2, sp, #112
	add	x3, sp, #144
	bl	planet_longitude_ut
	str	w0, [sp, #92]
	ldr	w8, [sp, #92]
	tbz	w8, #31, .LBB0_4
	b	.LBB0_3
.LBB0_3:
	adrp	x8, :got:stderr
	ldr	x8, [x8, :got_lo12:stderr]
	ldr	x0, [x8]
	ldr	d0, [sp, #128]
	adrp	x1, .L.str.1
	add	x1, x1, :lo12:.L.str.1
	add	x2, sp, #144
	bl	fprintf
	fmov	d0, #-2.00000000
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_4:
	ldr	d0, [sp, #120]
	ldur	d1, [x29, #-24]
	bl	signed_angle_diff
	str	d0, [sp, #104]
	ldr	d0, [sp, #112]
	ldur	d1, [x29, #-24]
	bl	signed_angle_diff
	str	d0, [sp, #96]
	ldur	d0, [x29, #-64]
	mov	x8, #26388279066624             // =0x180000000000
	movk	x8, #16629, lsl #48
	fmov	d1, x8
	fdiv	d1, d0, d1
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #16502, lsl #48
	fmov	d0, x8
	fmul	d0, d0, d1
	fmov	d1, #2.00000000
	fmul	d0, d0, d1
	str	d0, [sp, #80]
	ldr	d0, [sp, #96]
	fabs	d0, d0
	adrp	x8, .LCPI0_1
	ldr	d1, [x8, :lo12:.LCPI0_1]
	fcmp	d0, d1
	b.pl	.LBB0_6
	b	.LBB0_5
.LBB0_5:
	ldr	d0, [sp, #128]
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_6:
	ldur	d0, [x29, #-40]
	str	d0, [sp, #72]
	ldur	d1, [x29, #-40]
	fmov	d0, #2.00000000
	fmul	d0, d0, d1
	str	d0, [sp, #64]
	str	wzr, [sp, #60]
	mov	w8, #2000                       // =0x7d0
	str	w8, [sp, #56]
	b	.LBB0_7
.LBB0_7:                                // =>This Inner Loop Header: Depth=1
	ldr	d0, [sp, #104]
	ldr	d1, [sp, #96]
	fmul	d0, d0, d1
	mov	w8, #0                          // =0x0
	fcmp	d0, #0.0
	str	w8, [sp, #4]                    // 4-byte Folded Spill
	b.le	.LBB0_10
	b	.LBB0_8
.LBB0_8:                                //   in Loop: Header=BB0_7 Depth=1
	ldr	d0, [sp, #64]
	ldur	d1, [x29, #-48]
	mov	w8, #0                          // =0x0
	fcmp	d0, d1
	str	w8, [sp, #4]                    // 4-byte Folded Spill
	b.pl	.LBB0_10
	b	.LBB0_9
.LBB0_9:                                //   in Loop: Header=BB0_7 Depth=1
	ldr	w8, [sp, #60]
	ldr	w9, [sp, #56]
	subs	w8, w8, w9
	cset	w8, lt
	str	w8, [sp, #4]                    // 4-byte Folded Spill
	b	.LBB0_10
.LBB0_10:                               //   in Loop: Header=BB0_7 Depth=1
	ldr	w8, [sp, #4]                    // 4-byte Folded Reload
	tbz	w8, #0, .LBB0_16
	b	.LBB0_11
.LBB0_11:                               //   in Loop: Header=BB0_7 Depth=1
	ldr	w8, [sp, #60]
	add	w8, w8, #1
	str	w8, [sp, #60]
	ldr	d0, [sp, #128]
	str	d0, [sp, #136]
	ldr	d0, [sp, #96]
	str	d0, [sp, #104]
	ldr	d0, [sp, #128]
	ldr	d1, [sp, #72]
	fadd	d0, d0, d1
	str	d0, [sp, #128]
	ldr	d1, [sp, #72]
	ldr	d0, [sp, #64]
	fadd	d0, d0, d1
	str	d0, [sp, #64]
	ldr	d0, [sp, #128]
	ldur	w0, [x29, #-12]
	ldur	w1, [x29, #-52]
	add	x2, sp, #112
	add	x3, sp, #144
	bl	planet_longitude_ut
	str	w0, [sp, #92]
	ldr	w8, [sp, #92]
	tbz	w8, #31, .LBB0_13
	b	.LBB0_12
.LBB0_12:
	adrp	x8, :got:stderr
	ldr	x8, [x8, :got_lo12:stderr]
	ldr	x0, [x8]
	ldr	d0, [sp, #128]
	adrp	x1, .L.str.2
	add	x1, x1, :lo12:.L.str.2
	add	x2, sp, #144
	bl	fprintf
	fmov	d0, #-3.00000000
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_13:                               //   in Loop: Header=BB0_7 Depth=1
	ldr	d0, [sp, #112]
	ldur	d1, [x29, #-24]
	bl	signed_angle_diff
	str	d0, [sp, #96]
	ldr	w8, [sp, #60]
	mov	w10, #4                         // =0x4
	sdiv	w9, w8, w10
	mul	w9, w9, w10
	subs	w8, w8, w9
	cbnz	w8, .LBB0_15
	b	.LBB0_14
.LBB0_14:                               //   in Loop: Header=BB0_7 Depth=1
	ldr	d0, [sp, #72]
	fmov	d1, #2.00000000
	fmul	d0, d0, d1
	str	d0, [sp, #72]
	b	.LBB0_15
.LBB0_15:                               //   in Loop: Header=BB0_7 Depth=1
	b	.LBB0_7
.LBB0_16:
	ldr	d0, [sp, #104]
	ldr	d1, [sp, #96]
	fmul	d0, d0, d1
	fcmp	d0, #0.0
	b.le	.LBB0_18
	b	.LBB0_17
.LBB0_17:
	adrp	x8, :got:stderr
	ldr	x8, [x8, :got_lo12:stderr]
	ldr	x0, [x8]
	ldr	d0, [sp, #64]
	adrp	x1, .L.str.3
	add	x1, x1, :lo12:.L.str.3
	bl	fprintf
	fmov	d0, #-4.00000000
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_18:
	ldur	d0, [x29, #-64]
	mov	x8, #26388279066624             // =0x180000000000
	movk	x8, #16629, lsl #48
	fmov	d1, x8
	fdiv	d0, d0, d1
	str	d0, [sp, #48]
	str	wzr, [sp, #20]
	mov	w8, #100                        // =0x64
	str	w8, [sp, #16]
	b	.LBB0_19
.LBB0_19:                               // =>This Inner Loop Header: Depth=1
	ldr	d0, [sp, #128]
	ldr	d1, [sp, #136]
	fsub	d0, d0, d1
	ldr	d1, [sp, #48]
	mov	w8, #0                          // =0x0
	fcmp	d0, d1
	str	w8, [sp]                        // 4-byte Folded Spill
	b.le	.LBB0_21
	b	.LBB0_20
.LBB0_20:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	w8, [sp, #20]
	ldr	w9, [sp, #16]
	subs	w8, w8, w9
	cset	w8, lt
	str	w8, [sp]                        // 4-byte Folded Spill
	b	.LBB0_21
.LBB0_21:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	w8, [sp]                        // 4-byte Folded Reload
	tbz	w8, #0, .LBB0_30
	b	.LBB0_22
.LBB0_22:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	w8, [sp, #20]
	add	w8, w8, #1
	str	w8, [sp, #20]
	ldr	d0, [sp, #136]
	ldr	d1, [sp, #128]
	fadd	d1, d0, d1
	fmov	d0, #0.50000000
	fmul	d0, d0, d1
	str	d0, [sp, #40]
	ldr	d0, [sp, #40]
	ldur	w0, [x29, #-12]
	ldur	w1, [x29, #-52]
	add	x2, sp, #32
	add	x3, sp, #144
	bl	planet_longitude_ut
	str	w0, [sp, #92]
	ldr	w8, [sp, #92]
	tbz	w8, #31, .LBB0_24
	b	.LBB0_23
.LBB0_23:
	adrp	x8, :got:stderr
	ldr	x8, [x8, :got_lo12:stderr]
	ldr	x0, [x8]
	ldr	d0, [sp, #40]
	adrp	x1, .L.str.4
	add	x1, x1, :lo12:.L.str.4
	add	x2, sp, #144
	bl	fprintf
	fmov	d0, #-5.00000000
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_24:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	d0, [sp, #32]
	ldur	d1, [x29, #-24]
	bl	signed_angle_diff
	str	d0, [sp, #24]
	ldr	d0, [sp, #24]
	fabs	d0, d0
	adrp	x8, .LCPI0_0
	ldr	d1, [x8, :lo12:.LCPI0_0]
	fcmp	d0, d1
	b.pl	.LBB0_26
	b	.LBB0_25
.LBB0_25:
	ldr	d0, [sp, #40]
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_26:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	d0, [sp, #104]
	ldr	d1, [sp, #24]
	fmul	d0, d0, d1
	fcmp	d0, #0.0
	b.hi	.LBB0_28
	b	.LBB0_27
.LBB0_27:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	d0, [sp, #40]
	str	d0, [sp, #128]
	ldr	d0, [sp, #24]
	str	d0, [sp, #96]
	b	.LBB0_29
.LBB0_28:                               //   in Loop: Header=BB0_19 Depth=1
	ldr	d0, [sp, #40]
	str	d0, [sp, #136]
	ldr	d0, [sp, #24]
	str	d0, [sp, #104]
	b	.LBB0_29
.LBB0_29:                               //   in Loop: Header=BB0_19 Depth=1
	b	.LBB0_19
.LBB0_30:
	ldr	d0, [sp, #136]
	ldr	d1, [sp, #128]
	fadd	d1, d0, d1
	fmov	d0, #0.50000000
	fmul	d0, d0, d1
	stur	d0, [x29, #-8]
	b	.LBB0_31
.LBB0_31:
	ldur	d0, [x29, #-8]
	.cfi_def_cfa wsp, 496
	ldr	x28, [sp, #480]                 // 8-byte Folded Reload
	ldp	x29, x30, [sp, #464]            // 16-byte Folded Reload
	add	sp, sp, #496
	.cfi_def_cfa_offset 0
	.cfi_restore w28
	.cfi_restore w30
	.cfi_restore w29
	ret
.Lfunc_end0:
	.size	find_event_jd, .Lfunc_end0-find_event_jd
	.cfi_endproc
                                        // -- End function
	.p2align	2                               // -- Begin function planet_longitude_ut
	.type	planet_longitude_ut,@function
planet_longitude_ut:                    // @planet_longitude_ut
	.cfi_startproc
// %bb.0:
	sub	sp, sp, #112
	.cfi_def_cfa_offset 112
	stp	x29, x30, [sp, #96]             // 16-byte Folded Spill
	add	x29, sp, #96
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	stur	d0, [x29, #-16]
	stur	w0, [x29, #-20]
	stur	w1, [x29, #-24]
	stur	x2, [x29, #-32]
	stur	x3, [x29, #-40]
	ldur	d0, [x29, #-16]
	ldur	w0, [x29, #-20]
	ldur	w1, [x29, #-24]
	ldur	x3, [x29, #-40]
	add	x2, sp, #8
	bl	swe_calc_ut
	str	w0, [sp, #4]
	ldr	w8, [sp, #4]
	tbz	w8, #31, .LBB1_2
	b	.LBB1_1
.LBB1_1:
	ldr	w8, [sp, #4]
	stur	w8, [x29, #-4]
	b	.LBB1_3
.LBB1_2:
	ldr	d0, [sp, #8]
	bl	norm360
	ldur	x8, [x29, #-32]
	str	d0, [x8]
	stur	wzr, [x29, #-4]
	b	.LBB1_3
.LBB1_3:
	ldur	w0, [x29, #-4]
	.cfi_def_cfa wsp, 112
	ldp	x29, x30, [sp, #96]             // 16-byte Folded Reload
	add	sp, sp, #112
	.cfi_def_cfa_offset 0
	.cfi_restore w30
	.cfi_restore w29
	ret
.Lfunc_end1:
	.size	planet_longitude_ut, .Lfunc_end1-planet_longitude_ut
	.cfi_endproc
                                        // -- End function
	.p2align	2                               // -- Begin function signed_angle_diff
	.type	signed_angle_diff,@function
signed_angle_diff:                      // @signed_angle_diff
	.cfi_startproc
// %bb.0:
	sub	sp, sp, #48
	.cfi_def_cfa_offset 48
	stp	x29, x30, [sp, #32]             // 16-byte Folded Spill
	add	x29, sp, #32
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	stur	d0, [x29, #-8]
	str	d1, [sp, #16]
	ldur	d0, [x29, #-8]
	bl	norm360
	str	d0, [sp]                        // 8-byte Folded Spill
	ldr	d0, [sp, #16]
	bl	norm360
	fmov	d1, d0
	ldr	d0, [sp]                        // 8-byte Folded Reload
	fsub	d0, d0, d1
	str	d0, [sp, #8]
	ldr	d0, [sp, #8]
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #16486, lsl #48
	fmov	d1, x8
	fcmp	d0, d1
	b.le	.LBB2_2
	b	.LBB2_1
.LBB2_1:
	ldr	d0, [sp, #8]
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #16502, lsl #48
	fmov	d1, x8
	fsub	d0, d0, d1
	str	d0, [sp, #8]
	b	.LBB2_2
.LBB2_2:
	ldr	d0, [sp, #8]
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #49254, lsl #48
	fmov	d1, x8
	fcmp	d0, d1
	b.hi	.LBB2_4
	b	.LBB2_3
.LBB2_3:
	ldr	d0, [sp, #8]
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #16502, lsl #48
	fmov	d1, x8
	fadd	d0, d0, d1
	str	d0, [sp, #8]
	b	.LBB2_4
.LBB2_4:
	ldr	d0, [sp, #8]
	.cfi_def_cfa wsp, 48
	ldp	x29, x30, [sp, #32]             // 16-byte Folded Reload
	add	sp, sp, #48
	.cfi_def_cfa_offset 0
	.cfi_restore w30
	.cfi_restore w29
	ret
.Lfunc_end2:
	.size	signed_angle_diff, .Lfunc_end2-signed_angle_diff
	.cfi_endproc
                                        // -- End function
	.globl	main                            // -- Begin function main
	.p2align	2
	.type	main,@function
main:                                   // @main
	.cfi_startproc
// %bb.0:
	sub	sp, sp, #144
	.cfi_def_cfa_offset 144
	stp	x29, x30, [sp, #128]            // 16-byte Folded Spill
	add	x29, sp, #128
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	stur	wzr, [x29, #-4]
	stur	wzr, [x29, #-8]
	mov	x8, #4630544841867001856        // =0x4043000000000000
	fmov	d0, x8
	stur	d0, [x29, #-16]
	mov	w8, #2025                       // =0x7e9
	stur	w8, [x29, #-20]
	mov	w8, #8                          // =0x8
	stur	w8, [x29, #-24]
	mov	w8, #1                          // =0x1
	stur	w8, [x29, #-28]
	movi	d0, #0000000000000000
	stur	d0, [x29, #-40]
	stur	w8, [x29, #-44]
	ldur	w0, [x29, #-20]
	ldur	w1, [x29, #-24]
	ldur	w2, [x29, #-28]
	ldur	d0, [x29, #-40]
	ldur	w3, [x29, #-44]
	bl	swe_julday
	stur	d0, [x29, #-56]
	mov	w8, #2                          // =0x2
	stur	w8, [x29, #-60]
	ldur	w0, [x29, #-8]
	ldur	d0, [x29, #-16]
	ldur	d1, [x29, #-56]
	ldur	w1, [x29, #-60]
	fmov	d2, #2.00000000
	mov	x8, #228698418577408            // =0xd00000000000
	movk	x8, #16502, lsl #48
	fmov	d3, x8
	fmov	d4, #1.00000000
	bl	find_event_jd
	str	d0, [sp, #56]
	ldr	d0, [sp, #56]
	fcmp	d0, #0.0
	b.pl	.LBB3_2
	b	.LBB3_1
.LBB3_1:
	adrp	x8, :got:stderr
	ldr	x8, [x8, :got_lo12:stderr]
	ldr	x0, [x8]
	ldr	d0, [sp, #56]
	adrp	x1, .L.str.5
	add	x1, x1, :lo12:.L.str.5
	bl	fprintf
	mov	w8, #1                          // =0x1
	stur	w8, [x29, #-4]
	b	.LBB3_3
.LBB3_2:
	ldr	d0, [sp, #56]
	mov	w0, #1                          // =0x1
	add	x1, sp, #52
	add	x2, sp, #48
	add	x3, sp, #44
	add	x4, sp, #32
	bl	swe_revjul
	ldr	d0, [sp, #32]
	fcvtzs	w8, d0
	str	w8, [sp, #28]
	ldr	d0, [sp, #32]
	ldr	s1, [sp, #28]
	fmov	w8, s1
	scvtf	d1, w8
	fsub	d0, d0, d1
	mov	x8, #4633641066610819072        // =0x404e000000000000
	fmov	d1, x8
	fmul	d0, d0, d1
	fcvtzs	w8, d0
	str	w8, [sp, #24]
	ldr	d0, [sp, #32]
	ldr	s2, [sp, #28]
	fmov	w8, s2
	scvtf	d2, w8
	fsub	d0, d0, d2
	ldr	s2, [sp, #24]
	fmov	w8, s2
	scvtf	d2, w8
	fnmsub	d0, d0, d1, d2
	fmul	d0, d0, d1
	str	d0, [sp, #16]
	ldr	d0, [sp, #16]
	fmov	d1, #0.50000000
	fadd	d0, d0, d1
	fcvtzs	w8, d0
	str	w8, [sp, #12]
	ldr	d0, [sp, #56]
	adrp	x0, .L.str.6
	add	x0, x0, :lo12:.L.str.6
	bl	printf
	ldr	w1, [sp, #52]
	ldr	w2, [sp, #48]
	ldr	w3, [sp, #44]
	ldr	w4, [sp, #28]
	ldr	w5, [sp, #24]
	ldr	w6, [sp, #12]
	adrp	x0, .L.str.7
	add	x0, x0, :lo12:.L.str.7
	bl	printf
	stur	wzr, [x29, #-4]
	b	.LBB3_3
.LBB3_3:
	ldur	w0, [x29, #-4]
	.cfi_def_cfa wsp, 144
	ldp	x29, x30, [sp, #128]            // 16-byte Folded Reload
	add	sp, sp, #144
	.cfi_def_cfa_offset 0
	.cfi_restore w30
	.cfi_restore w29
	ret
.Lfunc_end3:
	.size	main, .Lfunc_end3-main
	.cfi_endproc
                                        // -- End function
	.p2align	2                               // -- Begin function norm360
	.type	norm360,@function
norm360:                                // @norm360
	.cfi_startproc
// %bb.0:
	sub	sp, sp, #32
	.cfi_def_cfa_offset 32
	stp	x29, x30, [sp, #16]             // 16-byte Folded Spill
	add	x29, sp, #16
	.cfi_def_cfa w29, 16
	.cfi_offset w30, -8
	.cfi_offset w29, -16
	str	d0, [sp, #8]
	ldr	d0, [sp, #8]
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #16502, lsl #48
	fmov	d1, x8
	bl	fmod
	str	d0, [sp]
	ldr	d0, [sp]
	fcmp	d0, #0.0
	b.pl	.LBB4_2
	b	.LBB4_1
.LBB4_1:
	ldr	d0, [sp]
	mov	x8, #140737488355328            // =0x800000000000
	movk	x8, #16502, lsl #48
	fmov	d1, x8
	fadd	d0, d0, d1
	str	d0, [sp]
	b	.LBB4_2
.LBB4_2:
	ldr	d0, [sp]
	.cfi_def_cfa wsp, 32
	ldp	x29, x30, [sp, #16]             // 16-byte Folded Reload
	add	sp, sp, #32
	.cfi_def_cfa_offset 0
	.cfi_restore w30
	.cfi_restore w29
	ret
.Lfunc_end4:
	.size	norm360, .Lfunc_end4-norm360
	.cfi_endproc
                                        // -- End function
	.type	.L.str,@object                  // @.str
	.section	.rodata.str1.1,"aMS",@progbits,1
.L.str:
	.asciz	"swe_calc_ut error at t0 (%.6f): %s\n"
	.size	.L.str, 36

	.type	.L.str.1,@object                // @.str.1
.L.str.1:
	.asciz	"swe_calc_ut error at t1 (%.6f): %s\n"
	.size	.L.str.1, 36

	.type	.L.str.2,@object                // @.str.2
.L.str.2:
	.asciz	"swe_calc_ut error while bracketing (t=%.6f): %s\n"
	.size	.L.str.2, 49

	.type	.L.str.3,@object                // @.str.3
.L.str.3:
	.asciz	"Failed to bracket crossing within %.1f days\n"
	.size	.L.str.3, 45

	.type	.L.str.4,@object                // @.str.4
.L.str.4:
	.asciz	"swe_calc_ut error during bisection (mid=%.6f): %s\n"
	.size	.L.str.4, 51

	.type	.L.str.5,@object                // @.str.5
.L.str.5:
	.asciz	"Event search failed, code %.6f\n"
	.size	.L.str.5, 32

	.type	.L.str.6,@object                // @.str.6
.L.str.6:
	.asciz	"Event JD (UT): %.9f\n"
	.size	.L.str.6, 21

	.type	.L.str.7,@object                // @.str.7
.L.str.7:
	.asciz	"Calendar (UT): %04d-%02d-%02d %02d:%02d:%02d\n"
	.size	.L.str.7, 46

	.ident	"clang version 20.1.4"
	.section	".note.GNU-stack","",@progbits
